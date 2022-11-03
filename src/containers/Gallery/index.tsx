import {
  lazy,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { PaginationContext } from "../../contexts/PaginationContext";
import { GalleyStyledContainer } from "./styles";

const ImageFrame = lazy(() => import ("../../components/ImageFrame"));

const GalleryContainer = () => {
  const {
    allImageIds: allImagesIds,
    nextPage,
    imagesCount,
    hasNextPage,
  } = useContext(PaginationContext);
  const scrollContainerRef = useRef(null);
  const config: IntersectionObserverInit = useMemo(() => {
    return {
      root: null,
      rootMargin: `0px`,
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
    if (hasNextPage) {
      const observer = new IntersectionObserver(handleOnScroll, config);
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          observer.observe(scrollContainerRef.current);
        }
      }, 500);

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    }
  }, [handleOnScroll, hasNextPage]);

  const renderImages = useCallback((): ReactElement<HTMLImageElement>[] => {
    const arr = Array.from(allImagesIds.values());
    return arr.map((id, i) => {
      return <ImageFrame key={id} imageId={id} i={i} />;
    });
  }, [imagesCount]);

  return (
    <GalleyStyledContainer id="scrollArea">
      <span className="grid">{renderImages()}</span>
      {hasNextPage && (
        <div className="sentinel" ref={scrollContainerRef}>
          Loading...
        </div>
      )}
    </GalleyStyledContainer>
  );
};

export default GalleryContainer;
