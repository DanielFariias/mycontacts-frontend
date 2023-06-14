import { FormEvent, useState } from 'react'

import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'

import * as S from './styles'
import isEmailValid from '../../utils/isEmailValid'

interface IContactFormProps {
  buttonLabel: string
}

interface IError {
  field: string
  message: string
}

export default function ContactForm({ buttonLabel }: IContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [errors, setErrors] = useState<IError[]>([])

  function handleChangeName(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.value) {
      setErrors((prevState) => [
        ...prevState,
        {
          field: 'name',
          message: 'Nome é obrigatório',
        },
      ])
    } else {
      setErrors((prevState) =>
        prevState.filter((error) => error.field !== 'name'),
      )
    }

    setName(e.currentTarget.value)
  }

  function handleEmailChange(e: FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)

    if (e.currentTarget.value && !isEmailValid(e.currentTarget.value)) {
      const errorAlreadyExists = errors.some((error) => error.field === 'email')

      if (errorAlreadyExists) return

      setErrors((prevState) => [
        ...prevState,
        {
          field: 'email',
          message: 'e-mail inválido',
        },
      ])
    } else {
      setErrors((prevState) =>
        prevState.filter((error) => error.field !== 'email'),
      )
    }
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message
  }

  function hasError(fieldName: string) {
    return errors.some((error) => error.field === fieldName)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log({ name, email, phone, category })
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={handleChangeName}
          hasError={hasError('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          hasError={hasError('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
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
