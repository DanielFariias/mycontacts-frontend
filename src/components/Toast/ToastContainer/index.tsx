import { useCallback, useEffect, useState } from 'react'
import ToastMessage from '../ToastMessage'
import * as S from './styles'
import { toastEventManager } from '../../../utils/toast'

export interface IToastMessage {
  id: number
  text: string
  type: 'default' | 'success' | 'danger'
  duration: number
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  useEffect(() => {
    function handleAddToast({ text, type, duration }: any) {
      const newMessage = {
        id: Math.random(),
        text,
        type,
        duration,
      }

      setMessages((prevState) => [...prevState, newMessage])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id))
  }, [])

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemove={handleRemoveMessage}
        />
      ))}
    </S.Container>
  )
}
