export type Photo = {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: string;
  title: string;
  ispublic: boolean;
  isfriend: number;
  isfamily: number;
};

export type Pagination = {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: Photo[];
};

export type Gallery = {
  photos: Pagination;
  stat: string;
};

export type RenderedImage = {
  id: string;
  title: string;
  src: string;
  owner: string;
  isFavorited?: boolean;
};
