import styled from "styled-components";

export const GalleyStyledContainer = styled.div`
  .grid {
    min-height: 100vw;
    padding: 25px 30px;
    display: grid;
    grid-auto-rows: 250px;
    grid-gap: 30px;
  }
  .sentinel {
    height: 20px;
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
  }
  @media (max-width: 425px) {
    .grid {
      grid-template-columns: 1fr;
      grid-gap: 30px;
    }
  }

  @media (min-width: 426px) and (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 1025px) and (max-width: 1920px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  @media (min-width: 1921px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
`;
