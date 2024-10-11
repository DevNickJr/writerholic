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

export interface IUserLogin {
    email: string
    password: string
}
export interface IUserRegister {
    email: string
    password: string
    confirm_password: string
    username: string
    access_code: string
}

export interface ILoginReducerAction {
    type: "email" | "password";
    payload: string
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


export interface IPassword {
    old_password: string
    new_password: string
    confirm_password: string
  }
  

export interface IReducerAction<T> {
    type: T;
    payload?: string | { [key: string]: string };
    data?: string | { [key: string]: string };
    name?: string;
}

export interface ILoginReducerAction extends IReducerAction<"email" | "password"> {
    payload: string
}

export interface IRegistereducerAction extends IReducerAction<"email" | "password" | "confirm_password" | "phone" | "first_name" | "last_name" | "level" | "matric_no"> {
    payload: string
}

