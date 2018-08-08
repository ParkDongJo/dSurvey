import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import axios from 'axios'
import Spinner from 'vue-spinkit'
import VueCookies from 'vue-cookies'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('Spinner', Spinner)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

