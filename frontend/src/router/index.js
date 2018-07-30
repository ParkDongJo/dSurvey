import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import IndexVue from '@/pages/d-survey-index-view'
import SurveyJoinVeu from '@/pages/d-survey-join-view'
import SurveyCreateVeu from '@/pages/d-survey-create-view'
import SurveyWalletVue from '@/pages/d-survey-wallet-view'
import UserLoginVue from '@/pages/user-login-view'
import UserSignupVue from '@/pages/user-signup-view'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'd-survey-index',
      component: IndexVue
    },
    {
      path: '/survey/join',
      name: 'd-survey-join',
      component: SurveyJoinVeu
    },
    {
      path: '/survey/create',
      name: 'd-survey-create',
      component: SurveyCreateVeu
    },
    {
      path: '/survey/wallet',
      name: 'd-survey-wallet',
      component: SurveyWalletVue
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: UserLoginVue
    },
    {
      path: '/user/signup',
      name: 'user-signup',
      component: UserSignupVue
    }
  ]
})
