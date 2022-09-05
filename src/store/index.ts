import {InjectionKey} from 'vue'
import VuexPersistence from 'vuex-persist'
import {createStore, Store, StoreOptions, useStore as baseUseStore} from 'vuex'

// 为 store state 声明类型
export interface State {
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

const vuexLocal = new VuexPersistence<State>({
    key: 'test',
    storage: window.localStorage,
    reducer: (state) => ({count: state.count})
})

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
    },
    plugins: [vuexLocal.plugin]
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}
