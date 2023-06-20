import { useCallback, useEffect, useRef, useState } from 'react'

export default function useSafeAsyncState<T>(
  initialState: T,
): [T, (newState: T) => void] {
  const [state, setState] = useState(initialState)

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const setSafeAsyncState = useCallback((newState: T) => {
    if (isMounted.current) {
      setState(newState)
    }
  }, [])

  return [state, setSafeAsyncState]
}
