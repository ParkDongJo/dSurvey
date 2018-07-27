<template>
  <div>
    <app-header></app-header>

    <div class="center servey-join">
      <ui>
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
      </ui>
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
  beforeCreate () {
    console.log('test log')
  },
  computed: {
  },
  components: {
  }
}
</script>

<style scoped>
  .txt-center {
    text-align: center;
  }
  .servey-join {
    padding: 2rem 6rem
  }
  li>fieldset {
    width: 100%;
  }
</style>
