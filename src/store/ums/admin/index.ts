import {_GettersTree, defineStore} from 'pinia'
import {actionType, AdminStoreType, LoginFormType, LoginReturnType} from "@/types/ums/admin";
import {login} from "@/api/ums/admin";

export const useAdminStore = defineStore<string, AdminStoreType, _GettersTree<AdminStoreType>, actionType>('admin', {
        state: () => {
            return {
                saTokenInfo: {},
                resourceCode: []
            }
        },
        actions: {
            async login(value: LoginFormType): Promise<void> {
                const result: LoginReturnType = await login(value);
                console.log(result.saTokenInfo)
                this.saTokenInfo = result.saTokenInfo
                this.resourceCode = result.resourceCode
            },
            async logout(): Promise<void> {
                // TODO 调用后端的退出登录方法
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
