import { useHistory, useParams } from 'react-router-dom'
import IContact from '../../@types/contact'
import ContactForm from '../../components/ContactForm'
import PageHeader from '../../components/PageHeader'
import { useEffect, useState } from 'react'
import ContactsService from '../../services/ContactsService'
import Loader from '../../components/Loader'
import toast from '../../utils/toast'

export default function EditContact() {
  const [contact, setContact] = useState<IContact>({} as IContact)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  useEffect(() => {
    async function getContact() {
      try {
        const contact = await ContactsService.getById(id)

        setContact(contact)
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
  }, [id])

  async function handleSubmit(contact: IContact) {}
  return (
    <div>
      <Loader isLoading={isLoading} />

      <PageHeader title="Editar Daniel Fariias" />

      <ContactForm buttonLabel="Salvar Alterações" onSubmit={handleSubmit} />
    </div>
  )
}
