import { useEffect, useState } from 'react'
import ToastMessage from '../ToastMessage'
import * as S from './styles'
import { toastEventManager } from '../../../utils/toast'

interface IToastMessage {
  id: number
  text: string
  type: 'default' | 'success' | 'danger'
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  useEffect(() => {
    function handleAddToast({ text, type }: any) {
      const newMessage = {
        id: Math.random(),
        text,
        type,
      }

      setMessages((prevState) => [...prevState, newMessage])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          text={message.text}
          type={message.type}
        />
      ))}
    </S.Container>
  )
}
