<template>
  <div id="app">
      <!-- Header -->
      <app-header></app-header>

      <!-- Navigation -->
      <app-nav></app-nav>

      <!-- Main content -->
      <div role="main">
        <img src="../assets/logo.png">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import appHeader from '../components/Header.vue'
import appNav from '../components/Nav.vue'
import popover from '../components/Popover.vue'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    appHeader,
    appNav,
    popover
  },

  methods: {
    ...mapActions([
      'getUser'
    ])
  },

  created(){
    this.getUser()
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
