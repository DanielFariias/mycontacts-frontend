import { styled } from 'styled-components'

const Input = styled.input`
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

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`

export default Input
