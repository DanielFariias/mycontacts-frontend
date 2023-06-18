import * as S from './styles'

import XCircleIcon from '../../../assets/icons/x-circle.svg'
import CheckCircleIcon from '../../../assets/icons/check-circle.svg'

interface IToastMessageProps {
  text: string
  type?: 'default' | 'danger' | 'success'
}

export default function ToastMessage({
  text,
  type = 'default',
}: IToastMessageProps) {
  return (
    <S.Container type={type}>
      {type === 'danger' && (
        <img src={XCircleIcon} alt="Icone de X representando erro" />
      )}
      {type === 'success' && <img src={CheckCircleIcon} alt="Success" />}
      <strong>{text}</strong>
    </S.Container>
  )
}
