import { IComment } from "@/interfaces/schema"
import BaseService from "./BaseService"

const servicePrefix = "/comments"


export const apiAddComment = (data: IComment) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetComments = () => {
    return BaseService.get(`${servicePrefix}`)
}

export const apiGetComment = ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}`)
}

export const apiUpdateComment = (data: Partial<IComment> & { id: string }) => {
    return BaseService.patch(`${servicePrefix}/${data.id}`, data)
}

export const apiDeleteComment = (id: string) => {
    return BaseService.delete(`${servicePrefix}/${id}`)
}


