import request from '@/utils/request'
import {LoginFormType, LoginReturnType} from "@/types/ums/admin"

/* 登录 */
export const login: (data: LoginFormType) => Promise<LoginReturnType> = data => {
    return request.post('/ums/admin/doLogin', data)
}


export const test = () => {
    return request.get('/ums/admin/test')
}

