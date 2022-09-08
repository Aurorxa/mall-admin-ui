import {createI18n} from 'vue-i18n'

const messages = {
    en: {
        message: {
            test: 'hello world'
        }
    },
    zh: {
        message: {
            test: '你好，世界'
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
