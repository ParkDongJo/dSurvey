import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import IndexVue from '@/pages/d-survey-index'
import SurveyJoinVue from '@/pages/d-survey-join'
import SurveyCreateVue from '@/pages/d-survey-create'
import SurveyWalletVue from '@/pages/d-survey-wallet'
import UserLoginVue from '@/pages/user-login'
import UserSignupVue from '@/pages/user-signup'

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
      component: SurveyJoinVue
    },
    {
      path: '/survey/create',
      name: 'd-survey-create',
      component: SurveyCreateVue
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
