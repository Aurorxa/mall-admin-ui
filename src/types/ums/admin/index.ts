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

// 分页查询表单类型
export type QueryFormType = {
    // 用户名
    username?: string,
    // 邮箱
    email?: string,
    // 手机号码
    phone?: string,
    // 状态
    status?: number | null,
    // 页码
    pageNo: number,
    // 每页显示条数
    pageSize: number
}

// 新增表单类型
export type AddFormType = {
    // 用户名
    username?: string,
    // 密码
    password?: string,
    // 真实姓名
    realName?: string,
    // 昵称
    nickName?: string,
    // 性别
    gender?: number,
    // 手机号码
    phone?: string,
    // 邮箱
    email?: string,
    // 状态
    status?: number,
    // 头像
    avatar: string,
    // 排序字段
    sort: number
}

// 修改表单类型
export type EditFormType = {
    // 用户名
    username?: string,
    // 密码
    password?: string,
    // 真实姓名
    realName?: string,
    // 昵称
    nickName?: string,
    // 性别
    gender?: number,
    // 手机号码
    phone?: string,
    // 邮箱
    email?: string,
    // 状态
    status?: number,
    // 头像
    avatar: string,
    // 排序字段
    sort: number
}

// 分页列表查询返回类型
export type PageListReturnType = {
    id: string,
    username: string,
    realName: string,
    nickName: string,
    gender: string,
    phone: string,
    email: string,
    status: number,
    avatar: string,
    sort: number
}

// 详情接口返回类型
export type ViewReturnType = {
    id: string,
    username: string,
    realName: string,
    nickName: string,
    gender: string,
    phone: string,
    email: string,
    status: number,
    avatar: string,
    sort: number
}

// store 中 action 的类型
export interface ActionType {
    login(value: LoginFormType): Promise<void>

    logout(): Promise<void>

    clear(): Promise<void>

    profile(): Promise<void>
}

// store 中 storeType 的类型
export type StoreType = {
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
    tag?: string,
    username: string,
    avatar: string,
    resourceCodeList: string[],
    roleCodeList: string[]
}

// 登录返回的类型
export type LoginReturnType = {
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
    tag?: string,
}

// 用户信息返回的类型
export type ProfileType = {
    username: string,
    avatar: string,
    resourceCodeList: string[],
    roleCodeList: string[]
}
