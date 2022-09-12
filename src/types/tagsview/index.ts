import {RouteLocationNormalizedLoaded, RouteRecordRaw, useRoute} from "vue-router"

// store 中 storeType 的类型
export type StoreType = {
    tagsViewList: RouteLocationNormalizedLoaded[]
}

// store 中 action 的类型
export interface ActionType {
    addTagsViewList(tag: RouteLocationNormalizedLoaded): void
}
