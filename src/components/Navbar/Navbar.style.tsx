import styled from "styled-components";

import { globals } from "../../globals";

const { xSize, ySize } = globals;

export const NavbarWrapper = styled.nav`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;

  .row {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: ${ySize}px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 42px;
      height: 42px;
      cursor: pointer;
    }

    .right {
      display: flex;
      align-items: center;
      gap: 12px;

      .desktop-actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background-color: transparent;
        cursor: pointer;

        &.dark {
          transform: rotate(180deg);
        }
      }

      .burger {
        display: none;
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 6px;
      }
    }
  }

  .column {
    position: fixed;
    top: ${ySize}px;
    left: 0;
    width: ${xSize}px;
    height: calc(100vh - ${ySize}px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  @media (max-width: 767px) {
    .row {
      padding: 0 16px;
    }

    .right {
      .desktop-actions {
        display: none !important;
      }

      .burger {
        display: flex !important;
        align-items: center;
        justify-content: center;
      }
    }

    .column {
      display: none !important;
    }
  }
`;

export const MenuItem = styled.a<{ $isActive: boolean }>`
  cursor: pointer;
  color: ${({ $isActive, theme }) => ($isActive ? theme.brand : theme.fg)};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.65)};
  font-size: 18px;
  font-weight: 400;
  width: 100%;
  transition: 0.25s ease;
  &:hover {
    opacity: 1;
  }
`;

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.fg};
  z-index: 9999;
  display: none;
  flex-direction: column;
  padding: 0px 16px;
  gap: 20px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.open {
    display: flex;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .overlay-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: ${ySize}px;

    .close {
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .overlay-menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 28px;
    padding-top: 12px;
  }

  .overlay-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 16px;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      background-color: transparent;
      cursor: pointer;

      &.dark {
        transform: rotate(180deg);
      }
    }
  }

  @media (min-width: 768px) {
    display: none !important;
  }
`;
