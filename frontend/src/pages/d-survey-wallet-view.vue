<template>
  <div>
    <app-header></app-header>

    <p>Token: {{ value }}</p>

    <b-card-group deck>
      <b-card header="<b>Transactional log</b>">
        <b-list-group>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
        <p class="card-text mt-2">
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex
          nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris
          ad sit ipsum anim Lorem.
        </p>
      </b-card>
      <b-card header="<b>Owned survey List</b>">
        <b-list-group>
          <b-list-group-item href="#">Cras justo odio</b-list-group-item>
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
        </b-list-group>
        <p class="card-text mt-2">
          Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex
          nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua
          consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris
          ad sit ipsum anim Lorem.
        </p>
      </b-card>
    </b-card-group>

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
      let self = this
      let account = self.$store.state.web3.coinbase
      self.value = 0

      self.$store.state.walletInstance().balanceOf(account, {from: account}).then((result) => {
        self.value = result.toString(10)
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
