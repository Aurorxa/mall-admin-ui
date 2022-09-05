import {createApp} from 'vue'
import router from "@/router";
import App from '@/App.vue'
import {createPinia} from 'pinia'
import '@/style/index.scss'
import 'virtual:windi.css'
import 'reset-css'
import 'uno.css'
import 'element-plus/theme-chalk/src/index.scss'

const app = createApp(App)
app.use(router)
app.use(createPinia)
app.mount('#app')
