import * as S from './styles'

import XCircleIcon from '../../../assets/icons/x-circle.svg'
import CheckCircleIcon from '../../../assets/icons/check-circle.svg'
import { IToastMessage } from '../ToastContainer'
import { useEffect } from 'react'

interface IToastMessageProps {
  message: IToastMessage
  onRemove: (id: number) => void
}

export default function ToastMessage({
  message: { id, text, type, duration },
  onRemove,
}: IToastMessageProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemove(id)
    }, duration)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  function handleRemoveToast() {
    onRemove(id)
  }

  return (
    <S.Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && (
        <img src={XCircleIcon} alt="Icone de X representando erro" />
      )}
      {type === 'success' && <img src={CheckCircleIcon} alt="Success" />}
      <strong>{text}</strong>
    </S.Container>
  )
}
