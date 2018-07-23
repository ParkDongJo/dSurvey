<template>
  <div>
    <b-list-group>
      <b-list-group-item>Cras justo odio</b-list-group-item>
      <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
      <b-list-group-item>Morbi leo risus</b-list-group-item>
      <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
      <b-list-group-item>Vestibulum at eros</b-list-group-item>
    </b-list-group>

    <b-form-input v-model="text1"
                  type="text"
                  placeholder="Enter your name"></b-form-input>
    <p>Value: {{ text1 }}</p>
  </div>
</template>

<script>
    export default {
      name: 'token-sale',
      beforeCreate () {
        console.log('registerWeb3 Action dispatched from token-sale.vue')
        this.$store.dispatch('registerWeb3')
      },
      mounted () {
        console.log('dispatching getToken')
        this.$store.dispatch('getWallet')
      },
      data () {
        return {
          text1: 'test'
        }
      },
      methods: {
        getBalance (event) {
          this.$store.walletInstance.callBalanceOf().then(result => {
            console.log('ttttt : ', result)
          })
        }
      }
    }
</script>

<style scoped>

</style>
