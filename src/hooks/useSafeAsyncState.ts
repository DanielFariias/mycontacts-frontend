import { useCallback, useState } from 'react'
import useIsMounted from './useIsMounted'

export default function useSafeAsyncState<T>(
  initialState: T,
): [T, (newState: T) => void] {
  const [state, setState] = useState(initialState)

  const isMounted = useIsMounted()

  const setSafeAsyncState = useCallback(
    (newState: T) => {
      if (isMounted()) {
        setState(newState)
      }
    },
    [isMounted],
  )

  return [state, setSafeAsyncState]
}
