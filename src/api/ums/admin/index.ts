import request from '@/utils/request'
import {
    AddFormType,
    ChangePasswordFormType,
    EditFormType,
    LoginFormType,
    LoginReturnType,
    PageListReturnType,
    QueryFormType,
    ViewReturnType
} from "@/types/ums/admin"
import {PaginationReturn, ResponseData} from "@/utils/global";

/* 登录 */
export const loginApi: (data: LoginFormType) => Promise<ResponseData<LoginReturnType>> = data => {
    return request.post('/ums/admin/doLogin', data)
}

/* 退出登录 */
export const logoutApi = () => {
    return request.post('/ums/admin/logout')
}

/* 修改密码 */
export const changePasswordApi = (data: ChangePasswordFormType) => {
    return request.post('/ums/admin/changePassword', data)
}

/* 分页获取管理员数据 */
export const adminPageListApi: (data: QueryFormType) => Promise<ResponseData<PaginationReturn<PageListReturnType>>> = data => {
    return request.post(`/ums/admin/pageList/${data.pageNo}/${data.pageSize}`, {...data})
}

// 删除管理员数据
export const adminDeleteApi: (id: string) => Promise<ResponseData<null>> = (id: string) => {
    return request.delete(`/ums/admin/delete/${id}`)
}

// 管理员详情
export const adminViewApi: (id: string) => Promise<ResponseData<ViewReturnType>> = id => {
    return request.get(`/ums/admin/view/${id}`)
}

// 新增管理员
export const adminAddApi: (data: AddFormType) => Promise<ResponseData<null>> = data => {
    return request.post(`/ums/admin/add`, {...data})
}

// 编辑管理员
export const adminEditApi: (data: EditFormType, id: string) => Promise<ResponseData<null>> = (data, id) => {
    return request.put(`/ums/admin/edit/${id}`, {...data})
}

