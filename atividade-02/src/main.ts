import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.app' }
  }
})

app.use(ConfirmationService)
app.use(ToastService)
app.use(pinia)
app.use(router)

// Restaura sessão salva no localStorage
const authStore = useAuthStore()
authStore.restoreSession()

app.mount('#app')