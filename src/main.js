import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

const pinia = createPinia()

pinia.use(({store})=>{
    store.$router = markRaw(router)
})

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app');
