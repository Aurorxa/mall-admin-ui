import {createApp} from 'vue'
import router from "@/router";
import App from '@/App.vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/styles/index.scss'
import 'virtual:windi.css'
import 'reset-css'
import 'uno.css'
import 'element-plus/theme-chalk/src/index.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
