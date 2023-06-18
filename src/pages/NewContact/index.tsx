import IContact from '../../@types/contact'
import ContactForm from '../../components/ContactForm'
import PageHeader from '../../components/PageHeader'
import ContactsService from '../../services/ContactsService'
import toast from '../../utils/toast'

export default function NewContact() {
  async function handleSubmit(formData: IContact) {
    try {
      await ContactsService.create(formData)

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

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </div>
  )
}
