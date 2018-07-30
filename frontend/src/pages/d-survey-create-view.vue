<template>
  <div>
    <app-header></app-header>

    <app-questions></app-questions>

    <div class="center servey-tmpl">
      <template>
        <div class="row q-row">
          <div class="col-sm-3"><label :for="`type-${template.q.label}`">{{ template.q.input.name }}. </label></div>
          <div class="col-sm-9"><b-form-input :id="`type-${template.q.label}`" type="text" v-model="template.q.input.val"></b-form-input></div>
        </div>

        <b-container fluid>
          <b-row v-show="opt.show" class="my-1" v-for="(opt, index) in template.o" :key="opt.label">
            <b-col sm="3"><label :for="`type-${opt.label}-${index}`">{{ opt.input.name }} {{index}}</label></b-col>
            <b-col sm="9"><b-form-input :id="`type-${opt.label}-${index}`" type="text" v-model="opt.input.val"></b-form-input></b-col>
          </b-row>
        </b-container>

      </template>

    </div>

    <hr/>

    <p class="txt-center">
      <b-button v-on:click="addOptionInput" variant="primary">+ Add Option</b-button>
      <b-button v-on:click="addQuestion" variant="success">+ Add Question</b-button>
    </p>

    <hr/>

    <p class="txt-center">
      <b-button v-on:click="submit" variant="outline-success">Submit</b-button>
    </p>

  </div>
</template>

<script>
import { QUESTION_TMPL } from '../constants/index'
import Questions from '../components/Questions.vue'

export default {
  name: 'd-survey-create',
  created () {
    // this.$store.dispatch('getSurvey', {at: ''})
  },
  data () {
    return {
      template: QUESTION_TMPL
    }
  },
  computed: {
  },
  methods: {
    addOptionInput () {
      let optList = this.template.o
      let unlock = true

      optList = optList.map((e) => {
        if (!e.show && unlock) {
          e.show = !e.show
          unlock = false
        }

        return e
      })

      this.template.o = optList
    },
    addQuestion () {
      this.$store.commit('createNewQuestion', {
        template: this.template
      })

      this.clearTmpl()
    },
    clearTmpl () {
      let tmpl = this.template

      tmpl.q.input.val = ''
      tmpl.o.map((e, index) => {
        e.input.val = ''
        if (index !== 0) {
          e.show = false
        }

        return e
      })
      this.template = tmpl
    },
    submit () {
      let self = this
      // let account = self.$store.state.web3.coinbase
      self.value = 0

      // self.$store.state.surveyInstance().addQuestionAndChoices(account, {from: account}).then((result) => {
      //   self.value = result.toString(10)
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  },
  components: {
    'app-questions': Questions
  }
}
</script>

<style scoped>
  .servey-tmpl {
    padding: 2rem 2rem
  }
  .txt-center {
    text-align: center;
  }
  .q-row {
    padding: 15px;
  }
</style>
