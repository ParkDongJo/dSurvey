<template>
  <div class="movies">
    <h1>영화 목록</h1>
    <div v-for="movie in movies" class="movie">
      <img v-bind:src="movie.poster" class="poster">
      <div>
        <strong></strong>, <i></i> []
        <router-link :to="{ name: 'show', params: { id: movie.id }}">더보기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/movies')
    .then((response) => {
      this.movies = response.data
    })
  },
  data () {
    return {
      movies: []
    }
  }
}
</script>
