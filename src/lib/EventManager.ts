interface IEventManager {
  listeners: Map<string, Function[]>
}

export default class EventManager implements IEventManager {
  listeners: Map<string, Function[]>

  constructor() {
    this.listeners = new Map()
  }

  on(event: string, listener: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, [])

    this.listeners.get(event)?.push(listener)
  }

  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) return

    this.listeners.get(event)?.forEach((listener) => listener(payload))
  }

  removeListener(event: string, listenerToRemove: Function) {
    const listeners = this.listeners.get(event)

    if (!listeners) return

    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    )

    this.listeners.set(event, filteredListeners)
  }
}
