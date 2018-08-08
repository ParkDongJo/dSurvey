<template>
  <div class=''>
    <app-header></app-header>

    <!--<token-wallet></token-wallet>-->

    <app-tab></app-tab>

    <div class="center">
      <b-list-group v-if="surveyCtrlInstance">
        <b-list-group-item v-for="(survey, index) in surveyList" :key="index">
          <router-link to="/survey/join" @click.native="passJoinPage(survey.address)">{{ survey.title }}</router-link>
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

export default {
  name: 'd-survey-index',
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.$store.commit('showSpin')
    this.sync()
  },
  mounted () {
    // this.$store.commit('hideSpin')
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    },
    surveyCtrlInstance () {
      return this.$store.state.surveyCtrlInstance
    },
    surveyList () {
      return this.$store.state.ctrl.surveys
    }
  },
  components: {
    'token-wallet': Wallet,
    'app-header': Header,
    'app-card': Card,
    'app-tab': Tab
  },
  methods: {
    async sync () {
      await new Promise((resolve, reject) => { resolve(this.$store.dispatch('registerWeb3')) })
      await new Promise((resolve, reject) => { resolve(this.$store.dispatch('getWallet')) })
      await new Promise((resolve, reject) => { resolve(this.$store.dispatch('getSurveyCtrlIns')) })
    },
    passJoinPage (address) {
      this.$cookies.set('currentShowSurveyAddress', address)
      // this.$router.push('/survey/join')
    }
  }
}
</script>

<style>
  .center {
    margin: auto;
  }
</style>
