// 登录表单类型
export type LoginFormType = {
    // 用户名
    username: string,
    // 密码
    password: string,
    // 是否同意协议
    agree?: boolean
}

// 修改密码表单类型
export type ChangePasswordFormType = {
    // 原密码
    oldPassword: string,
    // 新密码
    newPassword: string,
    // 确认密码
    confirmPassword?: string
}

// store 中 action 的类型
export interface ActionType {
    login(value: LoginFormType): Promise<void>

    logout(): Promise<void>

    clear(): Promise<void>
}

export type SaTokenInfoType = {
    tokenName?: string,
    tokenValue?: string,
    isLogin?: boolean,
    loginId?: string,
    loginType?: string,
    tokenTimeout?: number,
    sessionTimeout?: number,
    tokenSessionTimeout?: number,
    tokenActivityTimeout?: number,
    loginDevice?: string,
    tag?: object,
}

// store 中 storeType 的类型
export type StoreType = {
    saTokenInfo: SaTokenInfoType,
    resourceCode: string[],
    menuList: object[]
}

// 登录返回的类型
export type LoginReturnType = {
    saTokenInfo: SaTokenInfoType,
    resourceCode: string[]
}
