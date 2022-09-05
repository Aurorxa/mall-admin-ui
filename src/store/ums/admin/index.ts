import {defineStore} from 'pinia'

export default defineStore('admin', {
        state: () => {
            return {
                count: 0
            }
        },
        actions: {},
        getters: {},
        persist: true
    }
)
