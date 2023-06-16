import { styled } from 'styled-components'

export const Container = styled.div`
  margin-top: 32px;
`

export const SearchContainer = styled.form`
  width: 100%;

  input {
    width: 100%;
    background-color: #fff;
    border: none;
    border-radius: 4px;
    height: 50px;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.04));
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`

interface IHeader {
  hasError: boolean
}

export const Header = styled.header<IHeader>`
  display: flex;
  justify-content: ${({ hasError }) =>
    hasError ? 'flex-end' : 'space-between'};
  align-items: center;
  margin-top: 32px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray.lighter};
  padding-bottom: 16px;

  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`

interface IListHeaderProps {
  orderBy: 'asc' | 'desc'
}

export const ListHeader = styled.header<IListHeaderProps>`
  margin-top: 24px;
  margin-bottom: 16px;

  button {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transform: ${({ orderBy }) =>
        orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
      transition: all 0.2s ease-in;
    }
  }
`

export const ListContainer = styled.ul``

export const Card = styled.li`
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    .contact-name {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      small {
        background-color: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px 8px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray.light};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      margin-left: 8px;
    }
  }

  & + & {
    margin-top: 16px;
  }
`

export const ErrorContainer = styled.div`
  margin-top: 32px;
  display: flex;

  img {
    object-fit: contain;
  }

  .details {
    margin-left: 24px;
    strong {
      color: ${({ theme }) => theme.colors.danger.main};
      font-weight: bold;
      font-size: 22px;
      display: block;
      margin-bottom: 16px;
    }
  }
`
