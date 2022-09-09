import {App as Application, createApp} from 'vue'
import router from "@/permission";
import App from '@/App.vue'
import pinia from '@/store'
import '@/styles/index.scss'
import 'virtual:windi.css'
import 'reset-css'
import 'uno.css'
import 'element-plus/theme-chalk/src/index.scss'
import FormDrawer from '@/components/FormDrawer/index.vue'
import i18n from "@/i18n";

const app: Application = createApp(App)
// 注册全局组件
app.component('FormDrawer', FormDrawer)
app.use(pinia)
app.use(i18n)
app.use(router)
app.mount('#app')
