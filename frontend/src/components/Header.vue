<template>
	<div>
    <h2>{{getAppTitle}}</h2>
    <div class="pull-right">
      <i class="fa fa-plus-circle icon"></i> Add Survey |
      <i class="fa fa-user-circle icon"></i> My Page
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
</style>
