import request from '@/utils/request'
import {
    AddFormType,
    ChangePasswordFormType,
    LoginFormType,
    LoginReturnType,
    PageListReturnType,
    QueryFormType,
    ViewReturnType
} from "@/types/ums/admin"
import {PaginationReturn, ResponseData} from "@/utils/global";

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
export const adminPageList: (data: QueryFormType) => Promise<ResponseData<PaginationReturn<PageListReturnType>>> = data => {
    return request.post(`/ums/admin/pageList/${data.pageNo}/${data.pageSize}`, {...data})
}

// 删除管理员数据
export const adminDelete: (id: string) => Promise<ResponseData<null>> = (id: string) => {
    return request.delete(`ums/admin/delete/${id}`)
}

// 管理员详情
export const adminView: (id: string) => Promise<ResponseData<ViewReturnType>> = id => {
    return request.get(`ums/admin/view/${id}`)
}

// 新增管理员
export const adminAdd: (data: AddFormType) => Promise<ResponseData<null>> = data => {
    return request.post(`ums/admin/add`, {...data})
}
