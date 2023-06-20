import { useHistory, useParams } from 'react-router-dom'
import IContact from '../../@types/contact'
import ContactForm from '../../components/ContactForm'
import PageHeader from '../../components/PageHeader'
import { useEffect, useRef, useState } from 'react'
import ContactsService from '../../services/ContactsService'
import Loader from '../../components/Loader'
import toast from '../../utils/toast'

interface IContactFormRef {
  setFildsValues: (contact: IContact) => void
}

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('Contato')
  const contactFormRef = useRef<IContactFormRef | null>(null)

  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  useEffect(() => {
    async function getContact() {
      try {
        const contact = await ContactsService.getById(id)

        contactFormRef.current?.setFildsValues(contact)
        setContactName(contact.name)
        setIsLoading(false)
      } catch {
        history.push('/')

        toast({
          text: 'Não foi possível buscar o contato, tente novamente',
          type: 'danger',
        })
      }
    }

    getContact()
  }, [id, history])

  async function handleSubmit(formData: IContact) {
    try {
      const response = await ContactsService.update(id, formData)

      setContactName(response.name)

      toast({
        text: 'Contato editado com sucesso!',
        type: 'success',
      })
    } catch {
      toast({
        text: 'Ocorreu um erro ao editar seu contato!',
        type: 'danger',
      })
    }
  }
  return (
    <div>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
