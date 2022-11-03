import { useMemo, useState } from "react";
import { RenderedImage } from "../../types/Gallery";
import {
  IMAGE_FAVOURITE_BUTTON_DATA_CY,
  IMAGE_OVERLAY_DATA_CY,
  IMAGE_OWNER_DATA_CY,
  IMAGE_TITLE_DATA_CY,
} from "../../utils/data-cy-constants";
import storage from "../../utils/FavouriteStorage";
import { ImageOverlayStyledContainer } from "./styles";

type ImageOverlayProps = {
  image: RenderedImage;
  isFavorited: boolean
  setIsFavorited: (param: boolean) => void
};

const ImageOverlay = (props: ImageOverlayProps) => {
  const defaultTitle = "No Title";
  const defaultOwner = "Anonymous";
  const { image, isFavorited, setIsFavorited } = props;
  const { title, owner, id } = image;
  const { addImageToFavourites } = storage;
  
  const buttonLabel = useMemo(
    () => (isFavorited ? "Favourited" : "Favourite"),
    [isFavorited]
  );

  const handleOnFavorite = (id: string) => {
    addImageToFavourites(id);
    setIsFavorited(true);
  };

  return (
    <ImageOverlayStyledContainer data-cy={IMAGE_OVERLAY_DATA_CY}>
      <span className="image-info">
        <span data-cy={IMAGE_TITLE_DATA_CY} className="title">{title || defaultTitle}</span>
        <hr />
        <span data-cy={IMAGE_OWNER_DATA_CY} className="owner">{owner || defaultOwner}</span>
      </span>
      <button
        data-cy={IMAGE_FAVOURITE_BUTTON_DATA_CY}
        disabled={isFavorited}
        onClick={() => handleOnFavorite(id)}
      >
        {buttonLabel}
      </button>
    </ImageOverlayStyledContainer>
  );
};

export default ImageOverlay;
