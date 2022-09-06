import {_GettersTree, defineStore} from 'pinia'
import {actionType, AdminStoreType, LoginFormType, LoginReturnType} from "@/types/ums/admin";
import {login} from "@/api/ums/admin";

export const useAdminStore = defineStore<string, AdminStoreType, _GettersTree<AdminStoreType>, actionType>('admin', {
        state: () => {
            return {
                saToken: '',
                userInfo: {}
            }
        },
        actions: {
            async login(value: LoginFormType): Promise<void> {
                const result: LoginReturnType = await login(value);
                this.saToken = result.saToken
            },
            async logout(): Promise<void> {
                // TODO 调用后端的退出登录方法
                // TODO 清除用户的缓存数据以及权限相关的配置
                this.saToken = ''
                this.userInfo = {}
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['saToken', 'userInfo']
                }
            ],
        },
    }
)
