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

export type PageResponse = {
  photos: Pagination;
  stat: string;
};

export type PageData = {
  pages: number;
  imagesIds: string[];
};

export type PhotoInfo = {
  id: string;
  owner: {
    username: string;
  };
  title: {
    _content: string;
  };
  secret: string;
  server: string;
};

export type PhotoInfoResponse = {
  photo: PhotoInfo;
  stat: string;
};

export type RenderedImage = {
  id: string;
  title: string;
  src: string;
  owner: string;
};
