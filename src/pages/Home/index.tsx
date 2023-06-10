import * as S from './styles'

import arrow from '../../assets/icons/arrow.svg'
import trash from '../../assets/icons/trash.svg'
import edit from '../../assets/icons/edit.svg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <S.Container>
      <S.SearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </S.SearchContainer>

      <S.Header>
        <strong>3 contatos</strong>

        <Link to="/new">Novo contato</Link>
      </S.Header>

      <S.ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Icone se setinha para cima" />
          </button>
        </header>

        <ul>
          <S.Card>
            <div className="info">
              <div className="contact-name">
                <strong>Daniel Farias</strong>
                <small>instagram</small>
              </div>
              <span>daniel@daniel.com</span>
              <span>(85) 99999-9999</span>
            </div>

            <div className="actions">
              <Link to="/edit/123">
                <img src={edit} alt="Icone de edição para editar um contato" />
              </Link>
              <button type="button">
                <img src={trash} alt="Icone de lixeira dentro de um botão" />
              </button>
            </div>
          </S.Card>
        </ul>
      </S.ListContainer>
    </S.Container>
  )
}
