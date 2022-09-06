// 登录表单类型
export type LoginFormType = {
    // 用户名
    username: string,
    // 密码
    password: string,
    // 是否同意协议
    agree: boolean
}

// store 中 action 的类型
export interface actionType {
    login(value: LoginFormType): Promise<void>

    logout(): Promise<void>
}

// store 中 storeType 的类型
export type AdminStoreType = {
    saToken: string,
    userInfo: object
}

// 登录返回的类型
export type LoginReturnType = {
    saToken: string
}
