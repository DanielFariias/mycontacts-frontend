import IContact from '../../@types/contact'
import ContactForm from '../../components/ContactForm'
import PageHeader from '../../components/PageHeader'
import ContactsService from '../../services/ContactsService'

export default function NewContact() {
  async function handleSubmit(formData: IContact) {
    try {
      const response = await ContactsService.create(formData)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </div>
  )
}
