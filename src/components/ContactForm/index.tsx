import {
  FormEvent,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  Ref,
} from 'react'

import Button from '../Button'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'

import * as S from './styles'

import isEmailValid from '../../utils/isEmailValid'
import useErrors from '../../hooks/useErrors'
import formatPhone from '../../utils/formatPhone'
import CategoriesService from '../../services/CategoriesService'
import IContact from '../../@types/contact'
import useSafeAsyncState from '../../hooks/useSafeAsyncState'

interface ICategory {
  id: string
  name: string
}

interface IContactFormProps {
  buttonLabel: string
  onSubmit: (contact: IContact) => Promise<void>
}

function ContactForm(
  { buttonLabel, onSubmit }: IContactFormProps,
  ref: Ref<{ setFildsValues: (contact: IContact) => void }>,
) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useSafeAsyncState<ICategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] =
    useSafeAsyncState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    getErrorMessageByFieldName,
    hasError,
    removeErrorByFieldName,
    setError,
    errors,
  } = useErrors()

  useImperativeHandle(
    ref,
    () => {
      return {
        setFildsValues: (contact: IContact) => {
          setName(contact.name ?? '')
          setEmail(contact.email ?? '')
          setPhone(formatPhone(contact.phone) ?? '')
          setCategoryId(contact.category_id ?? '')
        },
        resetFields: () => {
          setName('')
          setEmail('')
          setPhone('')
          setCategoryId('')
        },
      }
    },
    [],
  )

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
  }, [setCategories, setIsLoadingCategories])

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsSubmitting(true)

    const contact = {
      name,
      email,
      phone: phone.replace(/\D/g, ''),
      category_id: categoryId,
    }

    await onSubmit(contact)

    setIsSubmitting(false)
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
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChange={handleEmailChange}
          hasError={hasError('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
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
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

export default forwardRef(ContactForm)
