import { useMemo, useState } from "react";
import { RenderedImage } from "../../types/Gallery";
import storage from "../../utils/FavouriteStorage";
import { ImageOverlayStyledContainer } from "./styles";

type ImageOverlayProps = {
  image: RenderedImage;
};

const ImageOverlay = (props: ImageOverlayProps) => {
  const defaultTitle = "No Title";
  const defaultOwner = "Anonymous";
  const { image } = props;
  const { title, owner, id } = image;
  const { isImageFavourite, addImageToFavourites } = storage;
  const [isFavorited, setIsFavorited] = useState(isImageFavourite(id));
  const buttonLabel = useMemo(
    () => (isFavorited ? "Favourited" : "Favourite"),
    [isFavorited]
  );

  const handleOnFavorite = (id: string) => {
    addImageToFavourites(id);
    setIsFavorited(true);
  };

  return (
    <ImageOverlayStyledContainer>
      <span className="image-info">
        <span className="title">{title || defaultTitle}</span>
        <hr />
        <span className="owner">{owner || defaultOwner}</span>
      </span>
      <button disabled={isFavorited} onClick={() => handleOnFavorite(id)}>
        {buttonLabel}
      </button>
    </ImageOverlayStyledContainer>
  );
};

export default ImageOverlay;
