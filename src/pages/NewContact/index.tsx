import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Input from '../../components/input'

export default function NewContact() {
  return (
    <div>
      <PageHeader title="Novo contato" />
      <Input type="text" placeholder="Escreva algo" />
      <Select>
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>
      <Button>Salvar</Button>
      <Button disabled>Salvar</Button>
    </div>
  )
}
