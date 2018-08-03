import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import axios from 'axios'
import Spinner from 'vue-spinkit'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('Spinner', Spinner)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

