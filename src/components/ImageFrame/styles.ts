import styled from "styled-components";

export const ImageFrameStyledContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid #b2acac;
  border-radius: 5px;
  background-color: rgba(200,190,200,0.4);;

  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
