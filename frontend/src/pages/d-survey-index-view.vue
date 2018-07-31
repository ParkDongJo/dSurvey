<template>
  <div class=''>
    <app-header></app-header>

    <!--<token-wallet></token-wallet>-->

    <app-tab></app-tab>

    <div class="center">
      <b-list-group v-if="surveyCtrlInstance">
        <b-list-group-item v-for="survey in surveyList" :key="survey" href="#/survey/join">
          {{ survey }}
          <b-badge variant="primary" pill>14</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import Wallet from '@/pages/d-survey-wallet-view'
import Header from '../components/Header.vue'
import Card from '../components/Card.vue'
import Tab from '../components/Tab.vue'
import pollToken from '../util/poll/pollToken'

export default {
  name: 'd-survey-index',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('registerWeb3')
    this.$store.dispatch('getWallet')
    this.$store.dispatch('getSurveyCtrlIns')
    pollToken()
  },
  mounted () {
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    },
    surveyCtrlInstance () {
      return this.$store.state.surveyCtrlInstance
    },
    surveyList () {
      return this.$store.state.ctrl.surveyList
    }
  },
  components: {
    'token-wallet': Wallet,
    'app-header': Header,
    'app-card': Card,
    'app-tab': Tab
  },
  methods: {
  }
}
</script>

<style>
  .center {
    margin: auto;
  }
</style>
