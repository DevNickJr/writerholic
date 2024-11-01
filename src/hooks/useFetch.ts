import {keepPreviousData, QueryKey, useQuery} from '@tanstack/react-query'
import {AxiosResponse} from 'axios'

interface IProps<T> {
    api: (a?: any) => Promise<AxiosResponse<T, unknown>>
    param?: unknown
    key: QueryKey
    onSuccess?: (a: unknown) => void
    requireAuth?: boolean
    select?: (a: unknown) => T,
    enabled?: boolean
}

const useFetch = <T, >({api, param, key, select, enabled, ...rest}: IProps<T>) => {

    const {data, error, isLoading, isFetching, refetch, fetchStatus, isPlaceholderData } = useQuery({
        queryKey: [...key],
        enabled: typeof enabled === 'undefined' ? true : enabled,
        queryFn: () => api(param),
        select: select || ((d: { data: T }): T => d?.data),
        placeholderData: keepPreviousData,
        ...rest
    })

    return {data, error, isLoading, isFetching, refetch, fetchStatus, isPlaceholderData}
}

export default useFetch