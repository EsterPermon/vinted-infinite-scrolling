import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactElement,
} from "react";
import getImagesPerPage from "../api/images";
import { Photo, RenderedImage } from "../types/Gallery";
import { API_KEY, GET_RECENT_URL, IMAGE_BASE_URL } from "../utils/constants";

export type PaginationContextType = {
  allImages: RenderedImage[];
  nextPage: () => void;
};

const defaultValue = {
  allImages: [],
  nextPage: () => null,
};

export const PaginationContext =
  createContext<PaginationContextType>(defaultValue);

export const PaginationProvider = ({
  children,
}: {
  children?: ReactElement;
}) => {
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [allImages, setAllImages] = useState<RenderedImage[]>([]);
  const [allImagesIds, setAllImagesIds] = useState<string[]>([]);

  const pageURL = useMemo(() => {
    return `${GET_RECENT_URL}&api_key=${API_KEY}&per_page=20&page=${currPage}&format=json&nojsoncallback=1`;
  }, [currPage]);

  useEffect(() => {
    loadImages();
  }, [currPage]);

  useEffect(() => {
    const images = getImagesToRender(photos);
    setAllImages((prevState) => [...prevState, ...images]);
  }, [JSON.stringify(photos)]);

  const nextPage = useCallback(() => {
    if (currPage < totalPages) {
      setCurrPage((prevState) => prevState + 1);
    }
  }, [currPage, totalPages]);

  const loadImages = useCallback(() => {
    getImagesPerPage(pageURL).then((response) => {
      const { pages, photo: photos } = response;
      setTotalPages(pages);
      setPhotos(photos);
    });
  }, [pageURL]);

  const getImagesToRender = useCallback(
    (photos: Photo[]): RenderedImage[] => {
      const images: RenderedImage[] = [];
      for (let i = 0; i < photos.length; i++) {
        const { id, server, secret, title, owner } = photos[i];
        if (!allImagesIds.includes(id)) {
          setAllImagesIds((prevState) => [...prevState, id]);
          allImagesIds.push(id);
          images.push({
            id,
            title,
            owner,
            src: `${IMAGE_BASE_URL}/${server}/${id}_${secret}.jpg`,
            isFavorited: false,
          });
        }
      }
      return images;
    },
    [JSON.stringify(allImagesIds)]
  );

  const value = useMemo(() => {
    return { allImages, nextPage };
  }, [JSON.stringify(allImagesIds)]);

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
