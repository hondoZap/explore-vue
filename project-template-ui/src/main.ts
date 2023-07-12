import '@/assets/main.css'

import { createApp } from 'vue'

import pinia from '@/plugins/pinia'
import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
