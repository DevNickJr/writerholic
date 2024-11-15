import { ITag } from "@/interfaces/schema"
import BaseService from "./BaseService"
import { IQuery } from "@/interfaces"

const servicePrefix = "/tags"


export const apiAddTag = (data: ITag) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetTags = (params: IQuery) => {
    return BaseService.get(`${servicePrefix}?page=${params.page}&limit=${params.limit}&search=${params.search}`)
}

export const apiGetTag = ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}`)
}

export const apiUpdateTag = (data: Partial<ITag>, { id }: { id: string }) => {
    return BaseService.patch(`${servicePrefix}/${id}`, data)
}

export const apiDeleteTag = (id: string) => {
    return BaseService.delete(`${servicePrefix}/${id}`)
}


