import { useState } from 'react'

interface IError {
  field: string
  message: string
}

interface IUseErrorsOutput {
  setError: (error: IError) => void
  removeErrorByFieldName: (fieldName: string) => void
  getErrorMessageByFieldName: (fieldName: string) => string | undefined
  hasError: (fieldName: string) => boolean
  errors: IError[]
}

export default function useErrors(): IUseErrorsOutput {
  const [errors, setErrors] = useState<IError[]>([])

  function setError({ field, message }: IError) {
    const errorAlreadyExists = errors.find((error) => error.field === field)

    if (errorAlreadyExists) return

    setErrors((prevState) => [...prevState, { field, message }])
  }

  function removeErrorByFieldName(fieldName: string) {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fieldName),
    )
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message
  }

  function hasError(fieldName: string) {
    return errors.some((error) => error.field === fieldName)
  }

  return {
    setError,
    removeErrorByFieldName,
    getErrorMessageByFieldName,
    hasError,
    errors,
  }
}
