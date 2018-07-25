<template>
  <div>
    <b-form-input v-model="text"
                  type="text"
                  placeholder="Enter your name"></b-form-input>
    <p>Text: {{ text }}</p>
    <p>Value: {{ value }}</p>
    <p>
      <b-button v-on:click="getBalance">I am a Button</b-button>
    </p>
  </div>
</template>
<script>
export default {
  name: 'd-survey-wallet',
  data () {
    return {
      text: 'test',
      value: 0
    }
  },
  methods: {
    getBalance () {
      let account = this.$store.state.web3.coinbase
      this.value = 0

      this.$store.state.walletInstance().balanceOf(account, {from: account}).then((result) => {
        this.value = result.toString(10)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
