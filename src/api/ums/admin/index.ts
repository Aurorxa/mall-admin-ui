import request from '@/utils/request'
import {LoginFormType, LoginReturnType} from "@/types/ums/admin"

/* 登录 */
export function login(data: LoginFormType): Promise<LoginReturnType> {
    return request.post('/ums/doLogin', data)
}

