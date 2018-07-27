<template>
	<div class="header">
    <div>
      <router-link to="/"><h2>{{getAppTitle}}</h2></router-link>
      <div class="pull-right">
        <i class="fa fa-plus-circle icon"></i> Add Survey |
        <i class="fa fa-user-circle icon"></i> My Page
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.component('app-header', {
  computed: {
    ...mapGetters([
      'getAppTitle'
    ])
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
</style>
