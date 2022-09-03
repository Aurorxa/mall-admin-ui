import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore} from 'vuex'

// 为 store state 声明类型
export interface State {
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
    state: {
        count: 0
    },
    mutations: {
        setCount(state: State, count: number) {
            state.count = count
        }
    },
    getters: {
        getCount(state: State) {
            return state.count
        }
    }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}
