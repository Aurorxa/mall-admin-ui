import {_GettersTree, defineStore} from 'pinia'
import {actionType, AdminStoreType, ChangePasswordFormType, LoginFormType, LoginReturnType} from "@/types/ums/admin";
import {changePassword, login, logout} from "@/api/ums/admin";

export const useAdminStore = defineStore<string, AdminStoreType, _GettersTree<AdminStoreType>, actionType>('admin', {
    state: () => {
        return {
            saTokenInfo: {},
            resourceCode: []
        }
    },
    actions: {
        async login(value: LoginFormType): Promise<void> {
                // 登录接口
                const result: LoginReturnType = await login(value);
                // 设置值到 store 中
                this.saTokenInfo = result.saTokenInfo
                this.resourceCode = result.resourceCode
            },
            async logout(): Promise<void> {
                // 退出登录接口
                await logout()
                // 清除用户的缓存数据
                this.saTokenInfo = {}
                this.resourceCode = []
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['saTokenInfo', 'resourceCode']
                }
            ],
        },
    }
)
