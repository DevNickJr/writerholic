import { ITopic } from "@/interfaces/schema"
import BaseService from "./BaseService"
import { IQuery } from "@/interfaces"

const servicePrefix = "/topics"

// const Auth = (token: string) => ({
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })

export const apiAddTopic = (data: ITopic) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetTopics = (params: IQuery) => {
    return BaseService.get(`${servicePrefix}?page=${params.page}&limit=${params.limit}&search=${params.search}`)
}

export const apiGetAllTopics = () => {
    return BaseService.get(`${servicePrefix}/all?page=${Math.random()}&limit=${Math.random()}search=${Math.random()}`)
}

export const apiGetTopic = ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}`)
}

export const apiUpdateTopic = (data: Partial<ITopic>, { id }: { id: string }) => {
    return BaseService.patch(`${servicePrefix}/${id}`, data)
}

export const apiDeleteTopic = (id: string) => {
    return BaseService.delete(`${servicePrefix}/${id}`)
}


