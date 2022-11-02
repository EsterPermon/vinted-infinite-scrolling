import { Fragment, useCallback, useEffect, useState } from "react";
import { RenderedImage } from "../../types/Gallery";
import { ImageFrameStyledContainer } from "./styles";
import { API_KEY, GET_PHOTO_URL, IMAGE_BASE_URL } from "../../utils/constants";
import { getImageInfo } from "../../api/images";
import ImageOverlay from "../ImageOverlay";
import { useMemo } from "react";

type ImageFrameProps = {
  imageId: string;
};

const ImageFrame = (props: ImageFrameProps) => {
  const { imageId } = props;
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
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {showOverlay && <ImageOverlay image={image} />}
      <img src={image.src} alt={image.title} />
    </ImageFrameStyledContainer>
  ) : (
    <Fragment />
  );
};

export default ImageFrame;
