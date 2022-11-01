import { useState } from "react";
import { RenderedImage } from "../../types/Gallery";
import {
  ImageFrameStyledContainer,
  ImageOverlayStyledContainer,
} from "./styles";

type ImageFrameProps = {
  image: RenderedImage;
};

const ImageFrame = (props: ImageFrameProps) => {
  const { image } = props;
  const { title, src, owner } = image;
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <ImageFrameStyledContainer
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {showOverlay && <ImageOverlay title={title} owner={owner} />}
      <img src={src} alt={title} />
    </ImageFrameStyledContainer>
  );
};

type ImageOverlayProps = {
  title: string;
  owner: string;
};

const ImageOverlay = (props: ImageOverlayProps) => {
  const defaultTitle = "No Title";
  const defaultOwner = "Anonymous";
  const { title, owner } = props;
  const buttonLabel = "Favourite";

  return (
    <ImageOverlayStyledContainer>
      <span className="image-info">
        <span className="title">{title || defaultTitle}</span>
        <hr />
        <span className="owner">{owner || defaultOwner}</span>
      </span>
      <button>{buttonLabel}</button>
    </ImageOverlayStyledContainer>
  );
};

export default ImageFrame;
