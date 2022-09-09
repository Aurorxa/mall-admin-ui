import {createI18n} from 'vue-i18n'
import ZH from "@/i18n/lang/zh"
import EN from "@/i18n/lang/en"
import localStore from 'store2'

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


function checkIsJsonString(str: string) {
    try {
        //通过JSON将str转换为json对象，如果转换出现异常，进入catch,返回false
        let obj = JSON.parse(str);
        if (typeof obj === 'object' && obj) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        //转换异常，返回false
        return false;
    }
}

const i18n = createI18n({
    legacy: false, // 使用 Composition API
    globalInjection: true, // 全局使用 t 函数
    locale: localStore.get('language') === null ? 'zh' : (localStore.get('language').hasOwnProperty('language') ? localStore.get('language').language : 'zh'),
    messages
})

export default i18n
