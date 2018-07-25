<template>
  <card>
    <card-img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" alt="Card image cap" waves></card-img>
    <card-body>
      <card-title>Card with waves effect</card-title>
      <card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</card-text>
      <btn color="primary">Button</btn>
    </card-body>
  </card>
</template>
<script>
import Vue from 'vue'
import { Card, CardImg, CardBody, CardTitle, CardText, Btn } from 'mdbvue'

export default Vue.component('app-card', {
  components: {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Btn
  }
})
</script>

<style scoped>

</style>
