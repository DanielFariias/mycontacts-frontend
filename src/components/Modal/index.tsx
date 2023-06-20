import ReactDOM from 'react-dom'

import Button from '../Button'
import * as S from './styles'
import { ReactNode } from 'react'

interface IModalProps {
  title: string
  danger?: boolean
  children?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  isLoading?: boolean
  onCancel: () => void
  onConfirm: () => void
  visible: boolean
}

export default function Modal(props: IModalProps) {
  return ReactDOM.createPortal(
    <ModalComponent {...props} />,
    document.getElementById('modal-root') as HTMLElement,
  )
}

function ModalComponent({
  title,
  danger = false,
  isLoading = false,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible,
}: IModalProps) {
  if (!visible) return null

  return (
    <S.Overlay>
      <S.Container danger={danger}>
        <h1>{title}</h1>

        <div className="modal-body">{children}</div>

        <S.Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <Button
            danger={danger}
            type="button"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </S.Footer>
      </S.Container>
    </S.Overlay>
  )
}
