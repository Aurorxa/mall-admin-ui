// 基于 axios 进行二次封装
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {ElMessage} from 'element-plus'
import {useAdminStore} from '@/store/ums/admin'
import {ResponseData, ResponseDataCodeEnum} from "@/utils/global"
import qs from 'qs'


// 给 axios 配置全局默认值
const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 3000
})

// 添加请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 从 store 中获取 token
    const {saTokenInfo: {tokenValue, tokenName}} = useAdminStore()
    if (tokenValue) {
        config.headers = {[tokenName as string]: `Bearer ${tokenValue}`, ...config.headers}
    }
    // qs 是 axios 自带的序列化参数方式
    if (config.headers && config.headers["Content-Type"] &&
        config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
        config.params = qs.stringify(config.params);
    }
    return config
}, (error: any) => {
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
    const returnData: ResponseData<any> = response.data
    if (returnData.code === ResponseDataCodeEnum.SUCCESS_CODE) { // 请求成功，并且业务成功，返回解析后的数据
        return returnData.data
    } else { // 请求成功，业务失败，给出对应的提示
        if (returnData.code === ResponseDataCodeEnum.UNAUTHORIZED_CODE) { // 如果 token 过期，token 过时，token 无效等原因，就退出登录

        }
        ElMessage.error(returnData.msg) // 提示错误消息
        return Promise.reject(returnData.msg)
    }

}, (error: AxiosError) => { // 请求失败
    ElMessage.error(error.message) // 提示错误消息
    return new Promise(() => {
    })
})

export default instance
