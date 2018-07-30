<template>
  <div class="app-questions">
    <div class="center servey-tmpl" v-for="(item, indexQ) in questions">
      <template>
        <div class="row q-row">
          <div class="col-sm-3"><label :for="`type-${item.label}-${indexQ}`">{{ item.input.name }}_{{indexQ}}</label></div>
          <div class="col-sm-9"><b-form-input :id="`type-${item.label}-${indexQ}`" type="text" v-model="item.input.val" readonly></b-form-input></div>
        </div>

        <b-container fluid>
          <b-row v-show="opt.show" class="my-1" v-for="(opt, indexO) in options[indexQ]" :key="opt.label">
            <b-col sm="3"><label :for="`type-${opt.label}-${indexQ}-${indexO}`">{{ opt.input.name }}_{{indexQ}}_{{indexO}} </label></b-col>
            <b-col sm="9"><b-form-input :id="`type-${opt.label}-${indexQ}-${indexO}`" type="text" v-model="opt.input.val" readonly></b-form-input></b-col>
          </b-row>
        </b-container>

      </template>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.component('app-questions', {
    data () {
      return {
        questions: this.$store.state.createView.questions,
        options: this.$store.state.createView.options
      }
    }
  })
</script>

<style scoped>

</style>
