import { useEffect, useState } from 'react'

//works as unique identifier while working on localhost (save last used data)
const PREFIX = 'agrim-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    // useState is to get value from localStorage only once as it is a slow process
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue != null) return JSON.parse(jsonValue)

        // to check if App.js is giving any initial value or not
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    // fucntion to update local storage
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}