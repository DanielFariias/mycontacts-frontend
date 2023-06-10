import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'
import * as S from './styles'

interface IContactFormProps {
  buttonLabel: string
}

export default function ContactForm({ buttonLabel }: IContactFormProps) {
  return (
    <S.Form>
      <FormGroup>
        <Input placeholder="Nome" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>
      <FormGroup>
        <Select>
          <option value="0">Selecione um assunto</option>
          <option value="1">Assunto 1</option>
          <option value="2">Assunto 2</option>
          <option value="3">Assunto 3</option>
        </Select>
      </FormGroup>
      <S.ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </S.ButtonContainer>
    </S.Form>
  )
}
