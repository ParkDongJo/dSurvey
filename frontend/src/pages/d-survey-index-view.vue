<template>
  <div class=''>
    <app-header></app-header>

    <!--<token-wallet></token-wallet>-->

    <app-tab></app-tab>

    <div class="center">
      <b-list-group>
        <b-list-group-item href="#/survey/join">
          Awesome link
          <b-badge variant="primary" pill>14</b-badge>
        </b-list-group-item>
        <b-list-group-item href="#/survey/join" active>
          Link with active state
          <b-badge variant="primary" pill>14</b-badge>
        </b-list-group-item>
        <b-list-group-item href="#/survey/join">
          Action links are easy
          <b-badge variant="primary" pill>14</b-badge>
        </b-list-group-item>
        <b-list-group-item href="#/survey/join" disabled>
          Disabled link
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
  beforeCreated () {
    this.$store.dispatch('registerWeb3')
  },
  created () {
    this.$store.dispatch('getSurveyCtrlIns')
    pollToken()
    this.showSurveyList()
  },
  mounted () {
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  components: {
    'token-wallet': Wallet,
    'app-header': Header,
    'app-card': Card,
    'app-tab': Tab
  },
  methods: {
    showSurveyList () {
      console.log(this.$store.state.ctrl.surveyList)
    }
  }
}
</script>

<style>
  .center {
    margin: auto;
  }
</style>
