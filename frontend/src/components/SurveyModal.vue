<template>
  <div class="inline">
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
                      type="text"
                      placeholder="Enter token address"
                      v-model="tokenAddress"></b-form-input>
        <b-form-input class="modal-input"
                      type="text"
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
      router: null,
      selected: [], // Must be an array reference!
      options: [
        {text: 'Cosmetic', value: 0},
        {text: 'Cloth', value: 1}
      ],
      title: '',
      tokenAddress: '',
      reward: 0
    }
  },
  computed: {
    getRouter () {
      this.router = new VueRouter()
      return this.router
    }
  },
  methods: {
    clearData () {
      this.selected = []
      this.title = ''
      this.tokenAddress = ''
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
      if (!this.tokenAddress) {
        return false
      }
      if (!this.reward) {
        return false
      }
      return true
    },
    handleSubmit () {
      // this.names.push(this.name)

      //모달창이 닫혔을 경우 /survey/create으로 경로 이동이 되어야 함, 입력값과 함께
      let router = this.getRouter()
      this.clearData()
      this.router.go('/survey/create')
      this.$refs.modal.hide()
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
