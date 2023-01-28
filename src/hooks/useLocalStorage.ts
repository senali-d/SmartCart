import { useState } from 'react'

/**
 *
 * @param {string} key localstorage key name
 * @param {*} initialValue any initial value to store
 * @returns [storedValue, setValue]
 */

function useLocalStorage(key: string, initialValue: unknown) {
  function getLocalStorageItem() {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState(getLocalStorageItem())

  const setValue = (value: unknown) => {
    try {
      let valueToStore
      if (value instanceof Function) {
        valueToStore = value(storedValue)
      } else {
        valueToStore = value
      }
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue]
}
export default useLocalStorage