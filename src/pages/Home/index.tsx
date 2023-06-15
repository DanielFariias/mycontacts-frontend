import * as S from './styles'

import arrow from '../../assets/icons/arrow.svg'
import trash from '../../assets/icons/trash.svg'
import edit from '../../assets/icons/edit.svg'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import formatPhone from '../../utils/formatPhone'

interface IContact {
  id: string
  name: string
  email: string
  phone: string
  category_id: string
  category_name: string
}

export default function Home() {
  const [contacts, setContacts] = useState<IContact[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <S.Container>
      <S.SearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </S.SearchContainer>

      <S.Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>

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
          {contacts.map((contact) => (
            <S.Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img
                    src={edit}
                    alt="Icone de edição para editar um contato"
                  />
                </Link>
                <button type="button">
                  <img src={trash} alt="Icone de lixeira dentro de um botão" />
                </button>
              </div>
            </S.Card>
          ))}
        </ul>
      </S.ListContainer>
    </S.Container>
  )
}
