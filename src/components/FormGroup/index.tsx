import { ReactNode } from 'react'
import * as S from './styles'
import Spinner from '../Spinner'

interface IFormGroupProps {
  children: ReactNode
  error?: string | null
  isLoading?: boolean
}

export default function FormGroup({
  children,
  error = null,
  isLoading,
}: IFormGroupProps) {
  return (
    <S.Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </S.Container>
  )
}
