import {_GettersTree, defineStore} from "pinia"
import {ActionType, StoreType, TagViewType} from "@/types/tagsview"
import router from "@/router";

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
            async removeTag(tag: TagViewType) {
                // 处理路由
                const index = this.tagsViewList.findIndex(item => item.fullPath === tag.fullPath)
                if (index >= 1) {
                    // 前一个 tag
                    const prevTag: TagViewType = this.tagsViewList[index - 1]
                    await router.push(prevTag.fullPath)
                }
                this.tagsViewList.splice(this.tagsViewList.map(tags => tags.path).indexOf(tag.path), 1)
            },
            async removeRightTag(tag: TagViewType) {
                const index = this.tagsViewList.findIndex(item => item.fullPath === tag.fullPath)
                this.tagsViewList.splice(index + 1)
                // 处理路由
                await router.push(tag.fullPath)
            },
            async clearAllTag() {
                this.tagsViewList = []
                await router.push('/')
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

