import {_GettersTree, defineStore} from "pinia"
import {ActionType, StoreType, TagViewType} from "@/types/tagsview"

export const useTagsViewStore = defineStore<string, StoreType, _GettersTree<StoreType>, ActionType>('tagsView', {
        state: () => {
            return {
                tagsViewList: []
            }
        },
        actions: {
            addTagsViewList(tag: TagViewType): void {
                const isFind = this.tagsViewList.find(item => item.path === tag.path)
                // 数组去重
                if (!isFind) {
                    this.tagsViewList.push(tag)
                }
                // 找到首页，将首页放到数组中的首位置
                const home = this.tagsViewList.find(item => item.fullPath === '/');
                const firstIndex = this.tagsViewList.findIndex(item => item.fullPath === '/')
                if (home && firstIndex) {
                    this.tagsViewList.splice(firstIndex, 1)
                    this.tagsViewList.unshift(home)
                }
            },
            clear(): void {
                this.tagsViewList = []
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

