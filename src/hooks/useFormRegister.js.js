import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useFormRegister = (initialState, cb = () => { }) => {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        cb(fields)
    }, [fields])

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    const register = (field) => {
        return {
            id: field,
            name: field,
            onChange: handleChange,
            value: fields[field]
        }
    }

    return [register, setFields]
}