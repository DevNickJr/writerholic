import { IBlog } from "@/interfaces/schema"
import BaseService from "./BaseService"
import { IPaginate } from "@/interfaces"

const servicePrefix = "/blogs"


export const apiAddBlog = (data: IBlog) => {
    return BaseService.post(`${servicePrefix}`, data)
}

export const apiGetBlogs = (params: IPaginate) => {
    return BaseService.get(`${servicePrefix}?page=${params.page}&limit=${params.limit}`)
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

export const apiGetBlogComments =  ({ id }: { id: string }) => {
    return BaseService.get(`${servicePrefix}/${id}/comments`)
}