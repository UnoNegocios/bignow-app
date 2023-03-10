import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios"

import "@mux/mux-player";



Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("session_token");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
