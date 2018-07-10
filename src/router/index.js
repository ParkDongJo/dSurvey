import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/Dashboard'
import Signup from '@/pages/Signup'
import Survey from '@/pages/Survey'
import AddSurvey from '@/pages/AddSurvey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/survey',
      name: 'Survey',
      component: Survey
    },
    {
      path: '/survey/add',
      name: 'addSurvey',
      component: AddSurvey
    },
  ]
})
