import { createApp } from 'vue'
import { createVuetify  } from 'vuetify'
import { pt } from 'vuetify/locale'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueTheMask from 'vue-the-mask';

loadFonts()

const vuetifyLocale = createVuetify({
  locale: {
    locale: 'zhHans',
    fallback: 'pt',
    messages: { pt },
  },
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App)
  .use(VueTheMask)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(vuetifyLocale)
  .mount('#app')
