import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers'
import './assets/tailwind.css'


createApp(App)
    .use(router)
    .mount('#app');
