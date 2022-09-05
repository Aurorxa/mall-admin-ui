// 登录表单类型
export type loginFormType = {
    // 用户名
    username: string,
    // 密码
    password: string,
    // 是否同意协议
    agree: boolean
}

// 登录接口类型
export type loginType = {
    // 用户名
    username: string,
    // 密码
    password: string,
}

// 登录接口的返回类型
export type LoginReturnType = {
    id: string,
    accessToken: string
}
