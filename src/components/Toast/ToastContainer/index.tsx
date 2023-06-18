import { useEffect, useState } from 'react'
import ToastMessage from '../ToastMessage'
import * as S from './styles'

interface IToastMessage {
  id: number
  text: string
  type: 'default' | 'success' | 'danger'
}

export default function ToastContainer() {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  useEffect(() => {
    function handleAddToast(event) {
      const { text, type } = event.detail

      const newMessage = {
        id: Math.random(),
        text,
        type,
      }

      setMessages((prevState) => [...prevState, newMessage])
    }

    document.addEventListener('addtoast', handleAddToast)

    return () => {
      document.removeEventListener('addtoast', handleAddToast)
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
