import './assets/main.css'
import 'primeicons/primeicons.css'
import routers from './router'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";


import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(routers)
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    icon: true
})
app.mount('#app')
