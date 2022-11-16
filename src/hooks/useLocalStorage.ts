import { useState } from 'react'

const getInitialState = (key, initialValue) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(error)
    return initialValue
  }
}

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    getInitialState(key, initialValue)
  )

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setToValueStorage(valueToStore)
    } catch (err) {
      console.error(err)
    }
  }

  const setToValueStorage = (valueToStore) => {
    setStoredValue(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  const removeValueFromStore = () => {
    setStoredValue(null)
    localStorage.removeItem(key)
  }

  return [storedValue, setValue, removeValueFromStore]
}

export default useLocalStorage
