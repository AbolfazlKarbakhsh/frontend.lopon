import { useEffect, useState } from "react"

 const useStorage = (key, initialState) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    )

    useEffect(() => {
        localStorage.setItem(key , value)
    } , [value])

    return [value , setValue]
}

export default useStorage