import { ReactNode } from 'react'
import * as S from './styles'

interface IFormGroupProps {
  children: ReactNode
}

export default function FormGroup({ children }: IFormGroupProps) {
  return <S.Container>{children}</S.Container>
}
