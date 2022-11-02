import { PageResponse, PageData, Photo, PhotoInfo, PhotoInfoResponse } from "../types/Gallery";
import request from "./request";

export const getImageIdsPerPage = async (
  url: string
): Promise<PageData> => {
  try {
    const response: PageResponse = await request(url, {
      method: "GET",
    });
    const { photos, stat } = response;
    
    if(stat === 'fail') {
      throw new Error(
        `Request error: error loading page`
      );
    }

    const { photo, pages } = photos;
    const imagesIds = photo?.map((photo: Photo) => photo.id);
    return {
      pages,
      imagesIds,
    };
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

export const getImageInfo = async (url: string): Promise<PhotoInfo> => {
  try {
    const response: PhotoInfoResponse = await request(url, {
      method: "GET",
    });
    const { photo, stat } = response;
    if(stat === 'fail') {
      throw new Error(
        `Request error: error getting photo`
      );
    }
    const { id, owner, title, server, secret } = photo;
    return { id, owner, title, server, secret };
  } catch (error) {
    console.error(error);
    return Promise.reject();
  }
};
