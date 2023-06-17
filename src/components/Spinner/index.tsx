import * as S from './styles'

interface ISpinnerProps {
  size?: number
}

export default function Spinner({ size = 32 }: ISpinnerProps) {
  return <S.Spinner size={size} />
}
