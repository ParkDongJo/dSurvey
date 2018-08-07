<template>
  <div>
    <app-header></app-header>

    <p>Token: {{ value }}</p>

    <b-card-group deck>
      <b-card header="<b>Transactional log</b>">
        <b-list-group>
          <b-list-group-item href="#">

          </b-list-group-item>
        </b-list-group>
        <p class="card-text mt-2">
        </p>
      </b-card>
      <b-card header="<b>Owned survey List</b>">
        <b-list-group>
          <b-list-group-item v-for="(survey, index) in ownedSurvey" :key="index" href="#">
            {{survey.title}}
          </b-list-group-item>
        </b-list-group>
        <p class="card-text mt-2">
        </p>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
  import Survey from '../util/get/getSurvey'

  export default {
    name: 'd-survey-wallet',
    created () {
      this.$store.commit('showSpin')
      this.value = this.$store.state.wallet.value
      this.sync()
    },
    data () {
      return {
        value: 0,
        surveyList: []
      }
    },
    computed: {
      token () {
        return this.$store.state.ctrl.surveyList
      },
      ownedSurvey () {
        return this.surveyList
      }
    },
    methods: {
      async sync () {
        let list = await new Promise((resolve, reject) => {
          let account = this.$store.state.web3.coinbase

          resolve(this.$store.dispatch('getSurveyByAddr', {address: account}))
        })
        let tasks = list.map((e) => {
          return this.getSurvey(e)
        })

        Promise.all(tasks).then(async (surveys) => {
          await surveys.forEach(async (survey) => {
            let item = {}
            item.address = survey.surveyInstance.address
            item.title = await survey.surveyInstance.title().then((value) => { return value })
            this.surveyList.push(item)
          })
          this.$store.commit('hideSpin')
        })
      },
      getBalance () {
        let self = this
        let account = self.$store.state.web3.coinbase
        self.value = 0

        self.$store.state.walletInstance().balanceOf(account, {from: account}).then((result) => {
          self.value = result.toString(10)
        }).catch(err => {
          console.log(err)
        })
      },
      getSurvey (address) {
        return new Promise(function (resolve, reject) {
          Survey.init(address).then((result) => {
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
        })
      }
    },
    mounted () {
      // this.$store.commit('hideSpin')
    }
  }
</script>

<style scoped>

</style>
