import * as S from './styles'
import Spinner from '../Spinner'
import ReactPortal from '../ReactPortal'

interface ILoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: ILoaderProps) {
  if (!isLoading) return null

  return (
    <ReactPortal containerId="loader-root">
      <S.Overlay>
        <Spinner size={90} />
      </S.Overlay>
    </ReactPortal>
  )
}
