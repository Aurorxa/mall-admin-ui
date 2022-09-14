import {_GettersTree, defineStore} from "pinia";
import {ActionType, StoreType} from "@/types/sidebar";

export const useSidebarStore = defineStore<string, StoreType, _GettersTree<StoreType>, ActionType>('sidebar', {
        state: () => {
            return {
                sidebarOpened: false
            }
        },
        actions: {
            toggleSidebarOpened(): void {
                this.sidebarOpened = !this.sidebarOpened
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['sidebarOpened']
                }
            ],
        },
    }
)

