import { useRef } from 'react'
import IContact from '../../@types/contact'
import ContactForm from '../../components/ContactForm'
import PageHeader from '../../components/PageHeader'
import ContactsService from '../../services/ContactsService'
import toast from '../../utils/toast'

interface IContactFormRef {
  setFildsValues: (contact: IContact) => void
  resetFields: () => void
}

export default function NewContact() {
  const contactFormRef = useRef<IContactFormRef>(null)

  async function handleSubmit(formData: IContact) {
    try {
      await ContactsService.create(formData)

      contactFormRef.current?.resetFields()

      toast({
        text: 'Contato cadastrado com sucesso!',
        type: 'success',
      })
    } catch {
      toast({
        text: 'Ocorreu um erro ao cadastrar seu contato!',
        type: 'danger',
      })
    }
  }
  return (
    <div>
      <PageHeader title="Novo contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
