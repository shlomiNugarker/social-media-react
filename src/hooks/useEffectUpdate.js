import { useEffect, useRef } from "react"

export const useEffectUpdate = (cb, dependencies) => {
    const isMounting = useRef(true)

    useEffect(() => {
        if (isMounting.current) {
            isMounting.current = false
            return
        }
        cb()
        
        // eslint-disable-next-line
    }, dependencies)
}