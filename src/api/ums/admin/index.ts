import request from '@/utils/request'
import {loginType} from "@/utils/ums/admin";

/* 登录 */
export const login = (data: loginType) => {
    return request('/ums/doLogin', {
        method: 'POST',
        data
    })
}

/* 获取用户信息 */
// export const getUserInfo = (id) => {
//     return request(`/ums/admin/view/${id}`)
// }
