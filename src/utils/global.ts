// 后端接口返回的数据类型
export interface responseData<T> {
    code: ResponseDataCodeEnum, // 响应状态码
    data?: T, // 数据
    msg: string // 提示消息
}

// 状态码的枚举
export enum ResponseDataCodeEnum {
    // 成功
    SUCCESS_CODE = 200,
    // 没有授权
    UNAUTHORIZED_CODE = 401,
    // 错误
    ERROR_CODE = 500
}
