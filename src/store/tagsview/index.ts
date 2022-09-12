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
                console.log('tagsViewList', this.tagsViewList)
                const isFind = this.tagsViewList.find(item => item.path === tag.path)
                // 数组去重
                if (!isFind) {
                    this.tagsViewList.push(tag)
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

