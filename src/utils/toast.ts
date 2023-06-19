import EventManager from '../lib/EventManager'

interface IToast {
  text: string
  type: 'success' | 'danger' | 'default'
  duration?: number
}

export default function toast({ type, text, duration = 5000 }: IToast) {
  toastEventManager.emit('addtoast', { text, type, duration })
}

export const toastEventManager = new EventManager()
