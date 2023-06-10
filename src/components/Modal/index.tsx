import ReactDOM from 'react-dom'

import Button from '../Button'
import * as S from './styles'

interface IModalProps {
  title: string
  description: string
  danger?: boolean
}

export default function Modal({
  title,
  description,
  danger = false,
}: IModalProps) {
  return ReactDOM.createPortal(
    <S.Overlay>
      <S.Container danger={danger}>
        <h1>{title}</h1>
        <p>{description}</p>

        <S.Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button danger={danger} type="button">
            Deletar
          </Button>
        </S.Footer>
      </S.Container>
    </S.Overlay>,
    document.getElementById('modal-root') as HTMLElement,
  )
}
