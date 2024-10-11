import { ITopic } from "@/interfaces/schema"
import BaseService from "./BaseService"

const servicePrefix = "/topics"

// const Auth = (token: string) => ({
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })

export const apiAddTopic = (data: ITopic) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetTopics = () => {
    return BaseService.get(`${servicePrefix}`)
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


