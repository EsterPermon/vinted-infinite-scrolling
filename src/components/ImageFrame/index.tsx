import { Fragment, lazy, useCallback, useEffect, useState } from "react";
import { RenderedImage } from "../../types/Gallery";
import { ImageFrameStyledContainer } from "./styles";
import { API_KEY, GET_PHOTO_URL, IMAGE_BASE_URL } from "../../utils/constants";
import { getImageInfo } from "../../api/images";
import { useMemo } from "react";
import { FAVOURITE_IMAGE_DATA_CY, IMAGE_FRAME_DATA_CY } from "../../utils/data-cy-constants";
import storage from "../../utils/FavouriteStorage";

type ImageFrameProps = {
  imageId: string;
  i: number
};

const ImageOverlay = lazy(() => import ("../ImageOverlay"));

const ImageFrame = (props: ImageFrameProps) => {
  const { isImageFavourite } = storage;

  const { imageId, i } = props;
  const emptyImage = useMemo(() => {
    return {
      id: "",
      title: "",
      owner: "",
      src: "",
    };
  }, []);
  const [image, setImage] = useState<RenderedImage>(emptyImage);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isFavorited, setIsFavorited] = useState(isImageFavourite(imageId));
  const dataCy = useMemo(() => isFavorited ? `${FAVOURITE_IMAGE_DATA_CY}` : `${IMAGE_FRAME_DATA_CY}_${i}` , [isFavorited])

  useEffect(() => {
    fetchImageInfo(imageId);
  }, []);

  const fetchImageInfo = useCallback(async (imageId: string) => {
    const photoURL = `${GET_PHOTO_URL}&api_key=${API_KEY}&photo_id=${imageId}&format=json&nojsoncallback=1`;
    try {
      const imageInfo = await getImageInfo(photoURL);
      const { id, owner, title, server, secret } = imageInfo;
      const image: RenderedImage = {
        id,
        title: title._content,
        owner: owner.username,
        src: `${IMAGE_BASE_URL}/${server}/${id}_${secret}.jpg`,
      };
      setImage(image);
    } catch (e) {}
  }, []);

  return image.id ? (
    <ImageFrameStyledContainer
      data-cy={dataCy}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {showOverlay && <ImageOverlay image={image} isFavorited={isFavorited} setIsFavorited={setIsFavorited} />}
      <img src={image.src} alt={image.title} />
    </ImageFrameStyledContainer>
  ) : (
    <Fragment />
  );
};

export default ImageFrame;
