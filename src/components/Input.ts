import { css, styled } from 'styled-components'

interface IInputProps {
  hasError?: boolean
}

const Input = styled.input<IInputProps>`
  width: 100%;
  height: 52px;

  padding: 0 16px;

  border: 2px solid #fff;
  border-radius: 4px;

  outline: none;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ hasError, theme }) =>
    hasError &&
    css`
      color: ${theme.colors.danger.main};
      border-color: ${theme.colors.danger.main} !important;
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray.lighter};
    border-color: ${({ theme }) => theme.colors.gray.lighter};
    cursor: not-allowed;
  }
`

export default Input
