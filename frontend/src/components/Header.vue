<template>
	<div class="header">
    <div>
      <router-link to="/"><h2>{{getAppTitle}}</h2></router-link>
      <div class="pull-right">
        <survey-modal></survey-modal>
        <router-link class="icon" to="/survey/wallet"><i class="fa fa-user-circle"></i> My Page</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Modal from './SurveyModal.vue'

export default Vue.component('app-header', {
  computed: {
    ...mapGetters([
      'getAppTitle'
    ])
  },
  component: {
    'survey-modal': Modal
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
  .inline {
    display: inline;
  }
</style>
