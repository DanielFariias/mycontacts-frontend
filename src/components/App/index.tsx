import { ThemeProvider } from 'styled-components'

import GlobalStyles from '../../styles/global'
import defaultTheme from '../../styles/themes/default'

import * as S from './styles'
import Header from '../Header'
import Routes from '../../pages/Routes'
import ToastContainer from '../Toast/ToastContainer'

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <ToastContainer />

      <S.Container>
        <Header />
        <Routes />
      </S.Container>
    </ThemeProvider>
  )
}
