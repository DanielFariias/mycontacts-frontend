import Button from '../Button'
import * as S from './styles'
import { ReactNode } from 'react'
import ReactPortal from '../ReactPortal'

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

export default function Modal({
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
    <ReactPortal containerId="modal-root">
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
    </ReactPortal>
  )
}
