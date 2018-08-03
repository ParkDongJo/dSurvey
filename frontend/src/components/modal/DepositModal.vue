<template>
  <div class="inline-block">
    <span class="icon link" v-b-modal.depositModal><i class="fa fa-bitcoin"></i> Add Deposit</span>
    <!-- Modal Component -->
    <b-modal id="depositModal"
             ref="modal"
             title="Deposit token"
             @ok="handleOk"
             @shown="clearData">
      <form @submit.stop.prevent="handleSubmit">

        <b-form-input class="modal-input"
                      type="number"
                      placeholder="Enter survey title"
                      v-model="approve"></b-form-input>

      </form>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.component('deposit-modal', {
    data () {
      return {
        approve: 0
      }
    },
    computed: {

    },
    methods: {
      clearData () {
        this.approve = 0
      },
      handleOk (evt) {
        evt.preventDefault()
        if (this.approve !== 0) {
          this.handleSubmit()
        } else {
          alert('can not empty input')
        }
      },
      handleSubmit () {
        let self = this
        let ctrl = self.$store.state.surveyCtrlInstance()
        let approve = self.approve
        let account = self.$store.state.web3.coinbase
        self.$store.state.walletInstance().approve(
          ctrl.address,
          approve,
          {from: account}
        ).then(resp => {
          if (resp) {
            self.setAllowance(ctrl).then((result) => {
              self.$refs.modal.hide()
              self.clearData()
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 이게 안되나봄!!! 음... dispatch랑 안되는건가
      async setAllowance (ctrl) {
        let self = this
        return await self.$store.dispatch('setAllowance', {
          instance: ctrl
        })
      }
    }
  })
</script>

<style scoped>
  .link {
    color: #007bff;
  }
  .link:hover {
    color: -webkit-link;
    text-decoration: underline;
    background-color: transparent;
  }
</style>
