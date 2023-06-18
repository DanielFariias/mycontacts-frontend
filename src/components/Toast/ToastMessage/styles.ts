import { css, styled } from 'styled-components'

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
}

interface IContainerProps {
  type: 'default' | 'success' | 'danger'
}

export const Container = styled.div<IContainerProps>`
  padding: 16px 32px;

  color: #fff;
  border-radius: 8px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  img {
    margin-right: 8px;
  }

  & + & {
    margin-top: 12px;
  }
`
