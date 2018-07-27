<template>
  <div>
    <p>Token: {{ value }}</p>
    <!--<p>-->
      <!--<b-button v-on:click="getBalance">I am a Button</b-button>-->
    <!--</p>-->
  </div>
</template>
<script>
export default {
  name: 'd-survey-wallet',
  data () {
    return {
      value: 0
    }
  },
  methods: {
    getBalance () {
      let account = self.$store.state.web3.coinbase
      this.value = 0
      self.$store.state.walletInstance().balanceOf(account, {from: account}).then((result) => {
        this.value = result.toString(10)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  beforeMount () {
    // this.getBalance()
  },
  beforeUpdate () {
    // this.getBalance()
  }
}
</script>

<style scoped>

</style>
