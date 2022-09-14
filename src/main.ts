import { createApp} from 'vue'
import dialogService from '@caroundsky/el-plus-dialog-service'
import router from "@/permission"
import App from '@/App.vue'
import pinia from '@/store'
import '@/styles/index.scss'
import 'virtual:windi.css'
import 'reset-css'
import 'uno.css'
import 'element-plus/theme-chalk/src/index.scss'
import FormDrawer from '@/components/FormDrawer/index.vue'
import i18n from "@/i18n"

const app = createApp(App)
app.config.globalProperties.$dialogService = dialogService
// 注册全局组件
app.component('FormDrawer', FormDrawer)
app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')
