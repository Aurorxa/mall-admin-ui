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
            logout() {
                this.saToken = ''
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
