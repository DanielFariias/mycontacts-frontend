import ReactDOM from 'react-dom'

import * as S from './styles'

export default function Loader() {
  return ReactDOM.createPortal(
    <LoaderComponent />,
    document.getElementById('loader-root') as HTMLElement,
  )
}

function LoaderComponent() {
  return (
    <S.Overlay>
      <div className="loader" />
    </S.Overlay>
  )
}
