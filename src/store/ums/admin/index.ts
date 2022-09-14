import {_GettersTree, defineStore} from 'pinia'
import {ActionType, LoginFormType, LoginReturnType, StoreType} from "@/types/ums/admin";
import {login, logout} from "@/api/ums/admin";

export const useAdminStore = defineStore<string, StoreType, _GettersTree<StoreType>, ActionType>('admin', {
    state: () => {
        return {
            saTokenInfo: {},
            resourceCode: [],
            menuList: []
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
            await this.clear()
        },
        // 清除用户缓存数据
        async clear(): Promise<void> {
            this.saTokenInfo = {}
            this.resourceCode = []
            this.menuList = []
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
