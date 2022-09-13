import {LocationQuery, RouteMeta, RouteParams, RouteRecordName} from "vue-router"

export type TagViewType = {
    fullPath: string,
    meta: RouteMeta,
    name: RouteRecordName | null | undefined,
    params: RouteParams,
    path: string,
    query: LocationQuery,
    title?: string | null | undefined
}

// store 中 storeType 的类型
export type StoreType = {
    tagsViewList: TagViewType[],
    currentTagIndex: number
}

// store 中 action 的类型
export interface ActionType {
    addTagsViewList(tag: TagViewType): void

    removeTag(tag: TagViewType): void

    removeRightTag(tag: TagViewType): void

    setCurrentTagIndex(tag: TagViewType): void

    clearAllTag(): void

    clear(): void
}
