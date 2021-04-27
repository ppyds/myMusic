import('@/assets/css/reset.css')
setImmediate(()=>{
    import('@/assets/css/iconfont.css')
})
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
