import { Pagination } from "../types/Gallery";
import request from "./request";


const getImagesPerPage = async (url: string): Promise<Pagination> => {
  try {
    const response = await request(url, {
      method: "GET",
    });
    const { photos: paginationData } = response;

    return paginationData;
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

export default getImagesPerPage