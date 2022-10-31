import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { PaginationContext } from "../contexts/PaginationContext";

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
      const { id, title, src } = image;
      return <img key={id} src={src} alt={title} width="200" height="200" />;
    });
  }, [JSON.stringify(allImages)]);

  return (
    <div>
      {renderImages()}
      <div ref={scrollContainerRef} />
    </div>
  );
};

export default GalleryContainer;
