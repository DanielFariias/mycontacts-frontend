import * as S from './styles'

import arrow from '../../assets/icons/arrow.svg'
import trash from '../../assets/icons/trash.svg'
import edit from '../../assets/icons/edit.svg'
import sad from '../../assets/icons/sad.svg'
import emptyBox from '../../assets/icons/emptyBox.svg'
import magnifierQuestion from '../../assets/icons/magnifierQuestion.svg'

import { Link } from 'react-router-dom'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import formatPhone from '../../utils/formatPhone'
import Loader from '../../components/Loader'
import ContactsService from '../../services/ContactsService'
import IContact from '../../@types/contact'
import Button from '../../components/Button'

export default function Home() {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [contacts, searchTerm])

  const getContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactsList = await ContactsService.listContacts(orderBy)

      setHasError(false)
      setContacts(contactsList)
    } catch (error) {
      setHasError(true)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    getContacts()
  }, [getContacts])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchTerm(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
  }

  function handleTryAgain() {
    getContacts()
  }

  return (
    <S.Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && !hasError && (
        <S.SearchContainer>
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            type="text"
            placeholder="Pesquisar contato..."
          />
        </S.SearchContainer>
      )}

      <S.Header
        justifyContent={
          hasError
            ? 'flex-end'
            : contacts.length > 0
            ? 'space-between'
            : 'center'
        }
      >
        {!hasError && !!contacts.length ? (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        ) : null}

        <Link to="/new">Novo contato</Link>
      </S.Header>

      {hasError && (
        <S.ErrorContainer>
          <img src={sad} alt="Icone de carinha triste" />
          <div className="details">
            <strong>Ocorreu um erro ao carregar os contatos</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </S.ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && (
            <S.EmptyContainer>
              <img src={emptyBox} alt="Icone de uma caixa vazia" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão
                <strong>”Novo contato”</strong>à cima para cadastrar o seu
                primeiro!
              </p>
            </S.EmptyContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <S.SearchNotFoundContainer>
              <img
                src={magnifierQuestion}
                alt="Icone de uma lupa com uma interrogação"
              />
              <span>
                Nenhum resultado foi encontrado para
                <strong> ”{searchTerm}”</strong>.
              </span>
            </S.SearchNotFoundContainer>
          )}

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
                    <img
                      src={edit}
                      alt="Icone de edição para editar um contato"
                    />
                  </Link>
                  <button type="button">
                    <img
                      src={trash}
                      alt="Icone de lixeira dentro de um botão"
                    />
                  </button>
                </div>
              </S.Card>
            ))}
          </S.ListContainer>
        </>
      )}
    </S.Container>
  )
}
