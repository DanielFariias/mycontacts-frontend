import EventManager from '../lib/EventManager'

interface IToast {
  text: string
  type: 'success' | 'danger' | 'default'
}

export default function toast({ type, text }: IToast) {
  toastEventManager.emit('addtoast', { text, type })
}

export const toastEventManager = new EventManager()
