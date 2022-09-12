import {_GettersTree, defineStore} from "pinia"
import {ActionType, StoreType} from "@/types/tagsview"
import {RouteLocationNormalizedLoaded} from "vue-router"

export const useTagsViewStore = defineStore<string, StoreType, _GettersTree<StoreType>, ActionType>('tagsView', {
        state: () => {
            return {
                tagsViewList: []
            }
        },
        actions: {
            addTagsViewList(tag: RouteLocationNormalizedLoaded) {
                const isFind = this.tagsViewList.find(item => item.path === tag.path)
                // 数组去重
                if (!isFind) {
                    this.tagsViewList.push(tag)
                }
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['tagsViewList']
                }
            ],
        },
    }
)

