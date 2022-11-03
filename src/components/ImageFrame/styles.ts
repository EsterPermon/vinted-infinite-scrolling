import styled from "styled-components";

export const ImageFrameStyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);

  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
