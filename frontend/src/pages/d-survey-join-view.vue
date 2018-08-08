<template>
  <div>
    <app-header></app-header>

    <div class="center survey-join">
      <ul>
        <li class="row">
          <b-form-group>
            <h5>{{contents[0].question}}</h5>
            <b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="selected" :options="contents[0].options">
            </b-form-checkbox-group>
          </b-form-group>
        </li>

        <li class="row">
          <b-form-group>
            <h5>{{contents[1].question}}</h5>
            <b-form-checkbox-group id="checkboxes2" name="flavour2" v-model="selected" :options="contents[1].options">
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
export default {
  name: 'd-survey-join',
  data () {
    return {
      total: 0,
      selected: [
      ], // Must be an array reference!
      contents: [
        {
          question: 'What do you like color ?',
          options: [
            {text: 'RED', value: 'red'},
            {text: 'BLUE', value: 'blue'},
            {text: 'YELLOW', value: 'yellow'}
          ]
        },
        {
          question: 'What is your gender?',
          options: [
            {text: 'Male', value: 'male'},
            {text: 'Female', value: 'female'}
          ]
        }
      ]
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
      let account = this.$cookies.get('currentShowSurveyAddress')
      console.log('account : ', account)
      await new Promise((resolve, reject) => {
        resolve(this.$store.dispatch('getSurvey', {at: account}))
      }).then(async () => {
        this.total = await this.getAnswerTotal()
      }).then(async () => {
        this.getAnswer()
      })
    },
    getAnswerTotal () {
      return new Promise((resolve, reject) => {
        this.$store.state.selectedSurveyInstance().getNumOfQuestions().then((result) => {
          console.log('total : ', result.toString(10))
          resolve(result.toString(10))
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAnswer () {
      // let idx = new BigNumber(0)
      let max = this.total
      console.log(max)
      for (let i = 0; i < max; i++) {
        console.log('i : ', i)
        this.$store.state.selectedSurveyInstance().getQuestionAndChoices(i).then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
      }
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
