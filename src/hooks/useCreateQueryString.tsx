import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

interface Export {
    createQueryString: (values: {
        name: string;
        value: string;
    }[]) => string
}

const useCreateQueryString = (): Export => {
    const searchParams = useSearchParams()

    const createQueryString = useCallback(
        (values: { name: string, value: string }[]) => {
          const params = new URLSearchParams(searchParams.toString())
          values.forEach(value => params.set(value.name, value.value))
     
          return params.toString()
        },
        [searchParams]
      )

    return { createQueryString }
}

export default useCreateQueryString