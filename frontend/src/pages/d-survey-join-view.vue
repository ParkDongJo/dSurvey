<template>
  <div>
    <app-header></app-header>

    <div class="center survey-join">
      <ul>
        <li class="row" v-for="(opt, index) in contents" :key="index">
          <b-form-group>
            <h5 v-if="contents[index].q">{{contents[index].q}}</h5>
            <b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="selected" :options="contents[index].o">
            </b-form-checkbox-group>
          </b-form-group>
        </li>
      </ul>
      <p class="txt-center">
        <b-button v-on:click="">Submit</b-button>
      </p>

    </div>
  </div>
</template>

<script>
  import { QUESTION_JOIN_TMPL } from '../constants/index'
  export default {
    name: 'd-survey-join',
    data () {
      return {
        template: QUESTION_JOIN_TMPL,
        total: 0,
        selected: [
        ], // Must be an array reference!
        contents: []
      }
    },
    created () {
      this.sync()
    },
    mounted () {
      this.$store.commit('hideSpin')
    },
    computed: {
    },
    methods: {
      async sync () {
        // 트러플 코드
        // let account = this.$cookies.get('currentShowSurveyAddress')
        // await new Promise((resolve, reject) => {
        //   resolve(this.$store.dispatch('getSurvey', {at: account}))
        // }).then(async () => {
        //   this.total = await this.getAnswerTotal()
        // }).then(async () => {
        //   this.getAnswer()
        // })
        let account = this.$cookies.get('currentShowSurveyAddress')
        console.log(account)
        await new Promise((resolve, reject) => {
          resolve(this.$store.dispatch('getSurvey', {at: account}))
        }).then(() => {
          this.getAnswerTotal()
        })
      },
      // 트러플 코드
      // getAnswerTotal () {
      //   return new Promise((resolve, reject) => {
      //     this.$store.state.selectedSurveyInstance().getNumOfQuestions().then((result) => {
      //       resolve(result.toString(10))
      //     }).catch((err) => {
      //       reject(err)
      //     })
      //   })
      // },
      // async getAnswer () {
      //   // let idx = new BigNumber(0)
      //   let max = this.total
      //   for (let i = 0; i < max; i++) {
      //     await new Promise((resolve, reject) => {
      //       resolve(this.$store.state.selectedSurveyInstance().getQuestionAndChoices(i))
      //     }).then(async (result) => {
      //       this.template.q = result[0]
      //       for (let i = 0; i < result[1].length; i++) {
      //         this.template.o[i].text = result[1][i]
      //       }
      //       let row = JSON.parse(JSON.stringify(this.template))
      //       this.clearTmpl()
      //       this.contents.push(this.processOption(row))
      //     }).catch((err) => {
      //       console.log(err)
      //     })
      //   }
      // },
      // 리믹스 코드
      getAnswerTotal () {
        let self = this
        self.$store.state.selectedSurveyInstance().getNumOfQuestions(function (err, res) {
          if (!err) {
            self.total = res
            self.getAnswer()
          } else {
            console.log(err)
          }
        })
      },
      async getAnswer () {
        // let idx = new BigNumber(0)
        let max = this.total
        let self = this

        for (let i = 0; i < max; i++) {
          await new Promise((resolve, reject) => {
            self.$store.state.selectedSurveyInstance().getQuestionAndChoices(i, function (err, res) {
              if (!err) {
                let result = res
                self.template.q = result[0]
                console.log(res)
                console.log(res.toString())

                for (let i = 0; i < result[1].length; i++) {
                  self.template.o[i].text = result[1][i]
                }
                let row = JSON.parse(JSON.stringify(self.template))
                self.clearTmpl()
                self.contents.push(self.processOption(row))
                resolve(true)
              } else {
                console.log(err)
                reject(err)
              }
            })
          })
        }
      },
      processOption (row) {
        let i
        for (i = row.o.length - 1; i >= 0; i -= 1) {
          if (row.o[i].text === '') {
            row.o.splice(i, 1)
          }
        }
        return row
      },
      clearTmpl () {
        let tmpl = this.template

        tmpl.q = ''
        tmpl.o.map((e, index) => {
          e.value = ''
          return e
        })
        this.template = tmpl
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  .txt-center {
    text-align: center;
  }
  .survey-join {
    padding: 2rem 6rem
  }
  li>fieldset {
    width: 100%;
  }
</style>
