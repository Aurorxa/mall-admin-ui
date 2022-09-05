// 基于 axios 进行二次封装
import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import {ElMessage} from 'element-plus'
import store from '@/store'
import {responseData, ResponseDataCodeEnum} from "@/utils/global";

// 给 axios 配置全局默认值
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 3000
})

// 添加请求拦截器
instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    const accessToken = store.getters.accessToken
    if (accessToken) {
        // config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(async (response: AxiosResponse) => {
    const returnData: responseData<any> = response.data
    if (returnData.code === ResponseDataCodeEnum.SUCCESS_CODE) { // 请求成功，并且业务成功，返回解析后的数据
        return returnData.data
    } else { // 请求成功，业务失败，给出对应的提示
        if (returnData.code === ResponseDataCodeEnum.UNAUTHORIZED_CODE) { // 如果 token 过期，token 过时，token 无效等原因，就退出登录

        } else {
            ElMessage.error(returnData.msg)
        }
        return new Promise(() => {
        })
    }

}, error => { // 请求失败
    ElMessage.error(error.message) // 提示错误消息
    return new Promise(() => {
    })
})

export default instance
