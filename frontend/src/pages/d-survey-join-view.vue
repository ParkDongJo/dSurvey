<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'd-survey-join',
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
