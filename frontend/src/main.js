import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bignumber.js/bignumber.min.js"></script>
