import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactElement,
} from "react";
import { getImageIdsPerPage } from "../api/images";
import { API_KEY, GET_PHOTOS_BY_SEARCH_URL } from "../utils/constants";
import storage from "../utils/FavouriteStorage";

export type PaginationContextType = {
  allImageIds: Set<string>;
  nextPage: () => void;
  imagesCount: number;
  hasNextPage: boolean
};

const defaultValue = {
  allImageIds: new Set<string>(),
  nextPage: () => null,
  imagesCount: 0,
  hasNextPage: false
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
  const [allImageIds, setAllImageIds] = useState<Set<string>>(new Set());
  const [imagesCount, setImagesCount] = useState(allImageIds.size);
  const hasNextPage = useMemo(() => currPage < totalPages, [currPage, totalPages])
  const { getFavourites } = storage;

  const pageURL = useMemo(() => {
    return `${GET_PHOTOS_BY_SEARCH_URL}&api_key=${API_KEY}&per_page=20&page=${currPage}&safe_search=1&format=json&nojsoncallback=1`;
  }, [currPage]);

  useEffect(() => {
    fetchFavouriteImages();
  }, []);

  useEffect(() => {
    loadImages();
  }, [currPage]);

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrPage((prevState) => prevState + 1);
    }
  }, [currPage, totalPages]);

  const fetchFavouriteImages = useCallback(async () => {
    const favouritesIds = getFavourites();
    if (favouritesIds.length) {
      setImagesCount((prev) => prev + favouritesIds.length);
      setAllImageIds((prev) => new Set([...prev, ...favouritesIds]));
    }
  }, [imagesCount]);

  const loadImages = useCallback(async () => {
    const imagesPerPage = await getImageIdsPerPage(pageURL);
    const { pages, imagesIds } = imagesPerPage;
    setTotalPages(pages);
    setImagesCount((prev) => prev + imagesIds.length);
    setAllImageIds((prev) => new Set([...prev, ...imagesIds]));
  }, [imagesCount]);

  const memoizedValue = useMemo(() => {
    return { allImageIds, nextPage, imagesCount, hasNextPage };
  }, [imagesCount, currPage, totalPages]);

  return (
    <PaginationContext.Provider value={memoizedValue}>
      {children}
    </PaginationContext.Provider>
  );
};
