import ReactDOM from 'react-dom'

import * as S from './styles'
import Spinner from '../Spinner'

interface ILoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: ILoaderProps) {
  if (!isLoading) return null

  return ReactDOM.createPortal(
    <LoaderComponent />,
    document.getElementById('loader-root') as HTMLElement,
  )
}

function LoaderComponent() {
  return (
    <S.Overlay>
      <Spinner size={90} />
    </S.Overlay>
  )
}
