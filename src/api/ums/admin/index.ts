import request from '@/utils/request'
import {
    ChangePasswordFormType,
    LoginFormType,
    LoginReturnType,
    PageListReturnType,
    QueryFormType
} from "@/types/ums/admin"

/* 登录 */
export const login: (data: LoginFormType) => Promise<LoginReturnType> = data => {
    return request.post('/ums/admin/doLogin', data)
}

/* 退出登录 */
export const logout = () => {
    return request.post('/ums/admin/logout')
}

export const test = () => {
    return request.get('/ums/admin/test')
}

/* 修改密码 */
export const changePassword = (data: ChangePasswordFormType) => {
    return request.post('/ums/admin/changePassword', data)
}

/* 分页获取管理员数据 */
export const pageList: (data: QueryFormType) => Promise<PageListReturnType> = data => {
    return request.post(`/ums/admin/pageList/`)
}

