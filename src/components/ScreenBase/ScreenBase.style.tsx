import styled from "styled-components";

import { globals } from "../../globals";

const { xSize, ySize } = globals;

export const ScreenBaseWrapper = styled.section`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: ${xSize}px;
    width: calc(100vw - ${xSize}px);
    top: 0;
    min-height: 100vh;

    overflow-y: auto;

    margin: 0;
    padding: 24px;

    padding-top: ${ySize + 24}px;
    padding-bottom: ${ySize}px;

    background-color: transparent;
  }

  @media (max-width: 768px) {
    .content {
      left: 0;
      width: 100vw;
    }
  }

  p {
    margin: 0;
    padding: 0;
  }
`;
