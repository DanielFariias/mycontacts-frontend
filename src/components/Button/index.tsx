import { ButtonHTMLAttributes, ReactNode } from 'react'
import * as S from './styles'
import Spinner from '../Spinner'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading?: boolean
  danger?: boolean
}

export default function index({
  children,
  isLoading,
  disabled,
  danger,
  ...restProps
}: IButtonProps) {
  return (
    <S.StyledButton
      disabled={disabled || isLoading}
      danger={danger}
      {...restProps}
    >
      {isLoading ? <Spinner size={16} /> : children}
    </S.StyledButton>
  )
}
