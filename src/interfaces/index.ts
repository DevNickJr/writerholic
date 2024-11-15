export enum StatusEnum {
    draft = 'Draft',
    published = 'Published',
    archived = 'Archived'
}

export enum RoleEnum {
    admin = 'Admin',
    author = 'Author',
    reader = 'Reader'
}

export interface IUserObj {
    email: string
    name: string
    website: string
}

export interface IUserLogin {
    email: string
    password: string
    remember: boolean
}


export interface IUserRegister {
    email: string
    password: string
    confirm_password: string
    username: string
    access_code: string
}

export interface SessionPayload {
    userId: string;
    expiresAt: Date;
}


///



export interface IForgotPassword { 
    email: string, 
    redirect_url: string 
}

export interface IChangePassword { 
    password: string,
    confirm_password: string, 
    token: string, 
    uidb64: 'MTI' 
}

export interface IUserRegister {
    email: string
    password: string
    confirm_password: string
    phone: string
    first_name: string      
    last_name: string        
    level: string      
}

export interface IProfile {
    email: string
    phone: string
    first_name: string      
    last_name: string        
    middle_name: string
    level: string      
    matric_no: string
    option: string 
}

export interface IPage {
    pageSize: number;
    pageIndex: number;
}

export interface IPassword {
    old_password: string
    new_password: string
    confirm_password: string
}

export interface IPaginate {
    page: string
    limit: string
}

export interface IQuery {
    page: string
    limit: string
    search: string
}

export interface IFeedback {
    email: string;
    name: string;
    message: string;
}

export interface IReducerAction<T> {
    type: keyof T | 'reset' | 'setAll';
    payload: string | number | boolean | T | null;
}

export interface ILoginReducerAction extends IReducerAction<"email" | "password"> {
    payload: string
}

export interface IRegistereducerAction extends IReducerAction<"email" | "password" | "confirm_password" | "phone" | "first_name" | "last_name" | "level" | "matric_no"> {
    payload: string
}


export interface IResponseData<T> {    
    totalItems: number
    totalPages: number
    currentPage: number
    items: T
}