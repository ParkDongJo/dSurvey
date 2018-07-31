<template>
  <div class="inline-block">
    <span class="icon link" v-b-modal.surveyModal><i class="fa fa-plus-circle"></i> Add Survey</span>
    <!-- Modal Component -->
    <b-modal id="surveyModal"
             ref="modal"
             title="Submit survey"
             @ok="handleOk"
             @shown="clearData">
      <form @submit.stop.prevent="handleSubmit">

        <b-form-group class="modal-input" label="Inline checkboxes (default)">
          <b-form-checkbox-group v-model="selected" name="survey" :options="options">
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-input class="modal-input"
                      type="text"
                      placeholder="Enter survey title"
                      v-model="title"></b-form-input>
        <b-form-input class="modal-input"
                      type="number"
                      placeholder="Enter token address"
                      v-model="token"></b-form-input>
        <b-form-input class="modal-input"
                      type="number"
                      placeholder="Enter survey reward"
                      v-model="reward"></b-form-input>

      </form>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.component('survey-modal', {
  data () {
    return {
      selected: [], // Must be an array reference!
      options: [
        {text: 'Cosmetic', value: 0},
        {text: 'Cloth', value: 1}
      ],
      title: '',
      token: 0,
      reward: 0
    }
  },
  computed: {

  },
  methods: {
    clearData () {
      this.selected = []
      this.title = ''
      this.token = 0
      this.reward = 0
    },
    handleOk (evt) {
      evt.preventDefault()
      if (this.checkVaild()) {
        this.handleSubmit()
      } else {
        alert('can not empty input')
      }
    },
    checkVaild () {
      if (!this.selected) {
        return false
      }
      if (!this.title) {
        return false
      }
      if (!this.token) {
        return false
      }
      if (!this.reward) {
        return false
      }
      return true
    },
    handleSubmit () {
      let self = this
      // 비동기로 호출 하여 Survey 생성
      self.$store.dispatch('createSurvey', {
        categoryIdx: self.selected[0],
        title: self.title,
        token: self.token,
        reward: self.reward,
        instance: self.$store.state.surveyCtrlInstance()
      })

      self.$router.push('/survey/create')
      self.$refs.modal.hide()
      self.clearData()
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
  .modal-input {
    margin-bottom: 0.5rem;
  }
</style>
