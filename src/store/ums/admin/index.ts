import {_GettersTree, defineStore} from 'pinia'
import {ActionType, LoginFormType, LoginReturnType, ProfileType, StoreType} from "@/types/ums/admin";
import {loginApi, logoutApi, profileApi} from "@/api/ums/admin";
import {ResponseData} from "@/utils/global";

export const useAdminStore = defineStore<string, StoreType, _GettersTree<StoreType>, ActionType>('admin', {
        state: () => {
            return {
                tokenName: '',
                tokenValue: '',
                isLogin: false,
                loginId: '',
                loginType: '',
                tokenTimeout: 0,
                sessionTimeout: 0,
                tokenSessionTimeout: 0,
                tokenActivityTimeout: 0,
                loginDevice: '',
                tag: '',
                resourceCodeList: [],
                roleCodeList: [],
                menuList: [],
                username: '',
                avatar: '',
                nickName: ''
            }
        },
        actions: {
            async login(value: LoginFormType): Promise<void> {
                // 登录接口
                const result: ResponseData<LoginReturnType> = await loginApi(value);
                // 设置值到 store 中
                Object.assign(this.$state, result.data)
            },
            async logout(): Promise<void> {
                // 退出登录接口
                await logoutApi()
                // 清除用户的缓存数据
                await this.clear()
            },
            // 清除用户缓存数据
            async clear(): Promise<void> {
                this.$reset()
            },
            // 设置用户信息
            async profile(): Promise<void> {
                const result: ResponseData<ProfileType> = await profileApi();
                this.username = result.data?.username
                this.avatar = result.data?.avatar
                this.resourceCodeList = result.data?.resourceCodeList
                this.roleCodeList = result.data?.roleCodeList
                this.nickName = result.data?.nickName
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: [
                        'tokenName',
                        'nickName',
                        'tokenValue',
                        'isLogin',
                        'loginId',
                        'loginType',
                        'tokenTimeout',
                        'sessionTimeout',
                        'tokenSessionTimeout',
                        'tokenActivityTimeout',
                        'loginDevice',
                        'resourceCodeList',
                        'roleCodeList',
                        'menuList',
                        'username',
                        'avatar',
                        'tag'
                    ]
                }
            ],
        },
    }
)
