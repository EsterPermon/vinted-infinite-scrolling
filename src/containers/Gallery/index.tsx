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
  const { allImageIds: allImagesIds, nextPage, imagesCount } = useContext(PaginationContext);
  const scrollContainerRef = useRef(null);
  const config: IntersectionObserverInit = useMemo(() => {
    return {
      root: document.querySelector("#scrollArea"),
      rootMargin: `${window.outerHeight}px`,
      threshold: 1.0,
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
    const arr = Array.from(allImagesIds.values());
    return arr.map((id) => {
      return <ImageFrame key={id} imageId={id} />;
    });
  }, [imagesCount]);

  return (
    <GalleyStyledContainer id="scrollArea">
      {renderImages()}
      <div ref={scrollContainerRef} />
    </GalleyStyledContainer>
  );
};

export default GalleryContainer;
