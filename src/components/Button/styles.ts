import { css, styled } from 'styled-components'

interface IStyledButtonProps {
  danger?: boolean
}

export const StyledButton = styled.button<IStyledButtonProps>`
  height: 52px;
  border: none;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background-color: #ccc !important;
    cursor: not-allowed !important;
    opacity: 0.7 !important;
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      background-color: ${theme.colors.danger.main};

      &:hover {
        background-color: ${theme.colors.danger.light};
      }

      &:active {
        background-color: ${theme.colors.danger.dark};
      }
    `}
`
