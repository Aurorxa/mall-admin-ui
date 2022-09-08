import {createI18n} from 'vue-i18n'
import ZH from "@/i18n/lang/zh";
import EN from "@/i18n/lang/en";

const messages = {
    en: {
        message: {
            ...EN
        }
    },
    zh: {
        message: {
            ...ZH
        }
    }
}
const locale = 'en'

const i18n = createI18n({
    legacy: false, // 使用 Composition API
    globalInjection: true, // 全局使用 t  函数
    locale,
    messages
})

export default i18n
