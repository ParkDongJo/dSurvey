<template>
  <div>
    <app-header></app-header>

    <div class="center">

      <template>
        <b-container fluid>
          <b-row class="my-1" v-for="type in types" :key="type">
            <b-col sm="3"><label :for="`type-${type}`">Type {{ type }}:</label></b-col>
            <b-col sm="9"><b-form-input :id="`type-${type}`" :type="type"></b-form-input></b-col>
          </b-row>
        </b-container>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-survey-create',
  data () {
    return {
      types: [
        'text', 'password', 'email', 'number', 'url',
        'tel', 'date', `time`, 'range', 'color'
      ]
    }
  },
  beforeCreate () {
    this.$store.dispatch('registerWeb3')
  },
  computed: {
  },
  components: {
  }
}
</script>

<style scoped>

</style>
