import styled from "styled-components";

export const ImageFrameStyledContainer = styled.div`
  position: relative;
  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
`;

export const ImageOverlayStyledContainer = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  .image-info {
    height: 50%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;

    .title {
      font-weight: bolder;
      font-size: 20px;
    }

    .owner {
      font-style: italic;
      font-size: 16px;
    }

    hr {
      width: 50%;
      size: 2px;
    }
  }

  button {
    background-color: transparent;
    color: white;
    font-size: 16px;
    padding: 9px;
    border: 1px solid white;
    border-radius: 18px;
    width: 100px;
    font-weight: bold;
    margin-bottom: 20px;

    &:hover:enabled {
      cursor: pointer;
    }
  }
`;
