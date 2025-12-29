import styled, { css } from "styled-components";

const languageSelectorStyles = css`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: border-color 0.25s ease, padding-top 0.25s ease, background 0s;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;

  cursor: pointer;

  color: ${({ theme }) => theme.fg};

  transition: 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.brand};
  }
`;

export const LanguageSelectorWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  .language-selector {
    ${languageSelectorStyles}

    min-width: 72px;
    width: 100%;
    padding: 10px 8px;
    gap: 10px;
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 100%;
    border: 1.5px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    margin-top: 2px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    background: ${({ theme }) => theme.bg};
    width: 100%;

    button {
      background-color: ${({ theme }) => theme.bg};
      color: ${({ theme }) => theme.fg};
      padding: 10px 8px;
      border: none;
      width: 100%;

      cursor: pointer;

      transition: 0.25s ease;

      &:hover {
        color: ${({ theme }) => theme.brand};
      }

      &.selected {
        color: ${({ theme }) => theme.brand};
      }
    }
  }

  &[data-direction="up"] .dropdown {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 2px;
  }
`;
