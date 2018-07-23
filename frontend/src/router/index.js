import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
// import CasinoDapp from '@/pages/casino-dapp'
import TokenSale from '@/pages/d-survey-token-sale'


Vue.use(Router)
Vue.use(BootstrapVue)

import CasinoDapp from '@/pages/casino-dapp'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'token-sale',
      component: TokenSale
    }
  ]
})
