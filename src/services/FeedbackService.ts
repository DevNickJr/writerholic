import { IFeedback } from "@/interfaces/schema"
import BaseService from "./BaseService"
import { IPaginate } from "@/interfaces"

const servicePrefix = "/feedbacks"


export const apiAddFeedback = (data: IFeedback) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetFeedbacks = (params: IPaginate) => {
    return BaseService.get(`${servicePrefix}?page=${params.page}&limit=${params.limit}`)
}

export const apiGetFeedback = ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}`)
}

export const apiUpdateFeedback = (data: Partial<IFeedback>, { id }: { id: string }) => {
    return BaseService.patch(`${servicePrefix}/${id}`, data)
}

export const apiDeleteFeedback = (id: string) => {
    return BaseService.delete(`${servicePrefix}/${id}`)
}
