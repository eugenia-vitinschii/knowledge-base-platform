import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/sass/app.sass'
import "highlight.js/styles/github-dark.css";
import "highlight.js/styles/github.css";

import { useThemeStore } from './stores/theme/theme.store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

/** init theme after pinia */
const themeStore = useThemeStore()
themeStore.initTheme()
