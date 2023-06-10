import { Link } from 'react-router-dom'

import arrow from '../../assets/icons/arrow.svg'

import * as S from './styles'

interface IPageHeaderProps {
  title: string
}

export default function PageHeader({ title }: IPageHeaderProps) {
  return (
    <S.Container>
      <Link to="/">
        <img src={arrow} alt="Setinha para a esquerda" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </S.Container>
  )
}
