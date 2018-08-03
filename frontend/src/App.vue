<template>
  <div id="app">
    <router-view/>
    <div v-show="$store.state.app.loading" class="loading">
      <Spinner name="circle" color="blue" class="spiner"/>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'App',
  created () {
    this.$store.commit('showSpin')
  }
}
</script>

<style>
  #app {
    padding: 10em 15em;
  }
  .loading {
    z-index: 99999;
    display: block;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
  }
  .spiner {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
  }
</style>
