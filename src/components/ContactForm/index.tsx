import { FormEvent, useEffect, useState } from 'react'

import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'

import * as S from './styles'

import isEmailValid from '../../utils/isEmailValid'
import useErrors from '../../hooks/useErrors'
import formatPhone from '../../utils/formatPhone'
import CategoriesService from '../../services/CategoriesService'

interface ICategory {
  id: string
  name: string
}

interface IContactFormProps {
  buttonLabel: string
}

export default function ContactForm({ buttonLabel }: IContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<ICategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const {
    getErrorMessageByFieldName,
    hasError,
    removeErrorByFieldName,
    setError,
    errors,
  } = useErrors()

  useEffect(() => {
    async function getCategories() {
      setIsLoadingCategories(true)
      try {
        const categoriesList = await CategoriesService.list()

        setCategories(categoriesList)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }
    getCategories()
  }, [])

  function handleChangeName(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' })
    } else {
      removeErrorByFieldName('name')
    }
    setName(e.currentTarget.value)
  }

  function handleEmailChange(e: FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)

    if (e.currentTarget.value && !isEmailValid(e.currentTarget.value)) {
      setError({ field: 'email', message: 'e-mail inválido' })
    } else {
      removeErrorByFieldName('email')
    }
  }

  function handlePhoneChange(e: FormEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.currentTarget.value))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log({ name, email, phone: phone.replace(/\D/g, ''), categoryId })
  }

  const isFormValid = name && errors.length === 0

  return (
    <S.Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleChangeName}
          hasError={hasError('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChange={handleEmailChange}
          hasError={hasError('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <S.ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}
