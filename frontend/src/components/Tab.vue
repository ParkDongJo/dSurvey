<template>
    <div class="app-tab">
      <b-tabs v-if="surveyCtrlInstance">
        <b-tab title="All" active>
        </b-tab>
        <b-tab v-for="category in categories" :key="category" :title="category">
        </b-tab>
      </b-tabs>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default Vue.component('app-tab', {
      computed: {
        surveyCtrlInstance () {
          return this.$store.state.surveyCtrlInstance
        },
        categories () {
          return this.$store.state.ctrl.categories
        }
      }
    })
</script>

<style scoped>
  .app-tab {
    margin-bottom: 1em;
  }
</style>
