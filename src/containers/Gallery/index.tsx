import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ImageFrame from "../../components/ImageFrame";
import { PaginationContext } from "../../contexts/PaginationContext";
import { GalleyStyledContainer } from "./styles";

const GalleryContainer = () => {
  const { allImages, nextPage } = useContext(PaginationContext);
  const scrollContainerRef = useRef(null);
  const config: IntersectionObserverInit = useMemo(() => {
    return {
      root: null,
      rootMargin: `${window.outerHeight}px`,
      threshold: 0,
    };
  }, []);

  const handleOnScroll = useCallback(
    (entries: any) => {
      const target: IntersectionObserverEntry = entries[0];
      if (target.isIntersecting) {
        nextPage();
      }
    },
    [nextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleOnScroll, config);
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleOnScroll]);

  const renderImages = useCallback((): ReactElement<HTMLImageElement>[] => {
    return allImages.map((image) => {
      const { id } = image;
      return <ImageFrame key={id} image={image} />;
    });
  }, [JSON.stringify(allImages)]);

  return (
    <GalleyStyledContainer>
      {renderImages()}
      <div ref={scrollContainerRef} />
    </GalleyStyledContainer>
  );
};

export default GalleryContainer;
