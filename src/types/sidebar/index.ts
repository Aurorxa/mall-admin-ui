// store 中 storeType 的类型
export type StoreType = {
    sidebarOpened: boolean
}

// store 中 action 的类型
export interface ActionType {
    toggleSidebarOpened(): void
}
