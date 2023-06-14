import { ReactNode } from 'react'
import * as S from './styles'

interface IFormGroupProps {
  children: ReactNode
  error?: string | null
}

export default function FormGroup({ children, error = null }: IFormGroupProps) {
  return (
    <S.Container>
      {children}
      {error && <small>{error}</small>}
    </S.Container>
  )
}
