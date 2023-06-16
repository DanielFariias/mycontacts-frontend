import * as S from './styles'

import arrow from '../../assets/icons/arrow.svg'
import trash from '../../assets/icons/trash.svg'
import edit from '../../assets/icons/edit.svg'
import { Link } from 'react-router-dom'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import formatPhone from '../../utils/formatPhone'
import Loader from '../../components/Loader'
import delay from '../../utils/delay'

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
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [contacts, searchTerm])

  useEffect(() => {
    async function getContacts() {
      try {
        setIsLoading(true)

        const response = await fetch(
          `http://localhost:3001/contacts?orderBy=${orderBy}`,
        )

        await delay(1000)

        const data = await response.json()
        setContacts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getContacts()
  }, [orderBy])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchTerm(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  return (
    <S.Container>
      <Loader isLoading={isLoading} />
      <S.SearchContainer>
        <input
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          type="text"
          placeholder="Pesquisar contato..."
        />
      </S.SearchContainer>

      <S.Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>

        <Link to="/new">Novo contato</Link>
      </S.Header>

      {filteredContacts.length > 0 && (
        <S.ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Icone se setinha para cima" />
          </button>
        </S.ListHeader>
      )}

      <S.ListContainer>
        {filteredContacts.map((contact) => (
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
                <img src={edit} alt="Icone de edição para editar um contato" />
              </Link>
              <button type="button">
                <img src={trash} alt="Icone de lixeira dentro de um botão" />
              </button>
            </div>
          </S.Card>
        ))}
      </S.ListContainer>
    </S.Container>
  )
}
