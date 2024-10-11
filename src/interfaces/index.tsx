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
