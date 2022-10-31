import { Gallery } from "../types/Gallery";
import { BASE_URL } from "../utils/constants";

export default (url: string, options: RequestInit): Promise<Gallery> => {
  return fetch(`${BASE_URL}/${url}`, {
    ...options,
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(
          `Request error : ${response.statusText} code: ${response.status}`
        );
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
