import { createApp } from 'vue'
import 'vuetify/styles'
import App from './App.vue'
import { vuetify } from './plugins/vuetify'
import './styles/base.css'
import './styles/welcome.css'
import './styles/course.css'
import './styles/events.css'
import './styles/form-workshop.css'

createApp(App).use(vuetify).mount('#app')
