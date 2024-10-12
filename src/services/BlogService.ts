import { IBlog } from "@/interfaces/schema"
import BaseService from "./BaseService"

const servicePrefix = "/blogs"


export const apiAddBlog = (data: IBlog) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetBlogs = () => {
    return BaseService.get(`${servicePrefix}`)
}

export const apiGetBlog = ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}`)
}

export const apiUpdateBlog = (data: Partial<IBlog>, { id }: { id: string }) => {
    return BaseService.patch(`${servicePrefix}/${id}`, data)
}

export const apiDeleteBlog = (id: string) => {
    return BaseService.delete(`${servicePrefix}/${id}`)
}


