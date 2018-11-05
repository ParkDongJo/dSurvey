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
import Wallet from '@/pages/d-survey-wallet'
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
  },
  computed: {
    web3 () {
      return this.$store.state.dto.web3
    },
    surveyCtrlInstance () {
      return this.$store.state.dto.controller.instance
    },
    surveyList () {
      return this.$store.state.dto.controller.surveys
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
      await new Promise((resolve, reject) => { resolve(this.$store.dispatch('getWallet', {at: this.$store.state.app.tokenAddress})) })
      await new Promise((resolve, reject) => { resolve(this.$store.dispatch('getSurveyCtrlIns')) })
    },
    passJoinPage (address) {
      // 현재 선택된 설문 컨트렉트 주소 저장
      this.$cookies.set('currentShowSurveyAddress', address)
    }
  }
}
</script>

<style>
  .center {
    margin: auto;
  }
</style>
