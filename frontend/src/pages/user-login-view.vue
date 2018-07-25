<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'user-login',
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
