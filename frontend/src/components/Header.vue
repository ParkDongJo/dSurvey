<template>
	<div class="header">
    <div>
      <router-link to="/"><h2>{{getAppTitle}}</h2></router-link>
      <div class="pull-left">
        <strong>Deposit : {{getAllowance}}</strong>
      </div>
      <div class="pull-right">
        <deposit-modal></deposit-modal> |
        <survey-modal></survey-modal> |
        <router-link class="icon" to="/survey/wallet"><i class="fa fa-user-circle"></i> My Page</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import sModal from './modal/SurveyModal.vue'
import dModal from './modal/DepositModal.vue'

export default Vue.component('app-header', {
  computed: {
    ...mapGetters([
      'getAppTitle',
      'getAllowance'
    ])
  },
  methods: {
    callAllowance () {
      let self = this
      let ctrl = self.$store.state.surveyCtrlInstance()

      self.$store.dispatch('setAllowance', {
        instance: ctrl
      })
    }
  },
  mounted () {

  },
  component: {
    'survey-modal': sModal,
    'deposit-modal': dModal
  }
})
</script>

<style>
  .icon:hover {
    cursor: pointer;
  }
  .header {
    margin-bottom: 2em
  }
  .inline-block {
    display: inline-block;
  }
</style>
