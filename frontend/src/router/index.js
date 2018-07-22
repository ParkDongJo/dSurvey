import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CasinoDapp from '@/pages/casino-dapp'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'casino-dapp',
      component: CasinoDapp
    }
//    {
//      path: '/',
//      name: 'index',
//      component: Index
//    },
//    {
//      path: '/:id',
//      name: 'show',
//      component: Show
//    }
  ]
})
