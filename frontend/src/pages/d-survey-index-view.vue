<template>
  <div class='metamask-info'>
    <p>Metamask : {{ web3.isInjected }}</p>
    <p>Network : {{ web3.networkId }}</p>
    <p>Account : {{ web3.coinbase }}</p>
    <p>Balance : {{ web3.balance }}</p>
    <token-wallet></token-wallet>
  </div>
</template>

<script>
import Wallet from '@/pages/d-survey-wallet-view'

export default {
  name: 'd-survey-index',
  beforeCreate () {
    this.$store.dispatch('registerWeb3')
    this.$store.dispatch('getWallet')
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  components: {
    'token-wallet': Wallet
  }
}
</script>

<style scoped>

</style>
