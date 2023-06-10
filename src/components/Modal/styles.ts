import { styled } from 'styled-components'

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
`

interface IContainerProps {
  danger?: boolean
}

export const Container = styled.div<IContainerProps>`
  width: 100%;
  max-width: 450px;

  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  h1 {
    font-size: 22px;
    color: ${({ theme, danger }) =>
      danger ? theme.colors.danger.main : theme.colors.gray.dark};
  }

  p {
    margin-top: 8px;
  }
`

export const Footer = styled.div`
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.gray.light};
  }
`
