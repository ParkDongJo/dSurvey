<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'user-signup',
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
