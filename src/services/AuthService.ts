import { IUserRegister, IUserLogin, IProfile, IPassword, IForgotPassword, IChangePassword } from '@/interfaces'
import BaseService from "./BaseService"

const servicePrefix = ""

const Auth = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const apiRegister = (data: IUserRegister) => {
    return BaseService.post(`${servicePrefix}/register/`, data)
}

export const apiRegisterFace = (data: FormData) => {
    
    return BaseService.post(`${servicePrefix}/face/register/`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const apiLogin = (data: IUserLogin) => {
    return BaseService.post(`${servicePrefix}/login/`, data)
}

export const apiLogout = (data: unknown) => {
    return BaseService.post(`${servicePrefix}/logout/`, data)
}

export const apiRefreshToken =  (data: { refresh: string }) => {
    return BaseService.post(`${servicePrefix}/token/refresh/`, data)
}

export const apiForgotPassword =  (data: IForgotPassword) => {
    return BaseService.post(`${servicePrefix}/password/reset/`, data)
}

export const apiChangePassword =  (data: IChangePassword) => {
    return BaseService.patch(`${servicePrefix}/password/reset/complete/`, data)
}

export const apiGetUser =  (token: string) => {
    return BaseService.get<IProfile>(`${servicePrefix}/user/`, Auth(token))
}

export const apiUpdatePassword =  (data: IPassword, token?: string) => {
    return BaseService.patch(`${servicePrefix}/password/change/`, data, Auth(token!))
}
