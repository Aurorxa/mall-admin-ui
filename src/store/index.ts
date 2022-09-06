import {createPinia} from 'pinia'
import persist from 'pinia-plugin-persist'

const store = createPinia()
store.use(persist)

export default store
