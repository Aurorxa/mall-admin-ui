import {_GettersTree, defineStore} from 'pinia'
import {actionType, LanguageStoreType} from "@/types/lang";

export const useLanguageStore = defineStore<string, LanguageStoreType, _GettersTree<LanguageStoreType>, actionType>('language', {
        state: () => {
            return {
                language: '' || 'zh'
            }
        },
        actions: {
            setLanguage(lang: string): void {
                this.language = lang
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['language']
                }
            ],
        },
    }
)
