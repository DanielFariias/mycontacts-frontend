import { styled } from 'styled-components'

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    display: block;
    color: ${({ theme }) => theme.colors.danger.main};
    margin-left: 8px;
    margin-top: 8px;
  }
`
