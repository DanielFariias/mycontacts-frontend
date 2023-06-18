interface IToast {
  text: string
  type: 'success' | 'danger' | 'default'
}

export default function toast({ type, text }: IToast) {
  const event = new CustomEvent('addtoast', {
    detail: {
      text,
      type,
    },
  })

  document.dispatchEvent(event)
}
