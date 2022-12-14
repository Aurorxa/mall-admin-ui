// 后端接口返回的数据类型
export interface ResponseData<T = any> {
    code: ResponseDataCodeEnum, // 响应状态码
    data?: T, // 数据
    msg: string // 提示消息
}

// 状态码的枚举
export enum ResponseDataCodeEnum {
    // 成功的状态码
    SUCCESS_CODE = 200,
    // 没有授权的状态码
    UNAUTHORIZED_CODE = 401,
    // 失败的状态码
    ERROR_CODE = 500
}

// 分页接口返回的数据类型
export interface PaginationReturn<T = any> {
    countId: number | null,
    current: number | null, // 当前页码
    maxLimit: number | null,
    optimizeCountSql: boolean | null,
    pages: number | null,
    searchCount: boolean | null,
    orders: object [] | null,
    size: number | null, // 每页显示条数
    total: number, // 总条数
    records: T[]  // 记录数
}
