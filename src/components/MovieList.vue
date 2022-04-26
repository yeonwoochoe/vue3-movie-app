<template>
  <div class="container">
    <div class="inner">
      <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieItem from "~/components/MovieItem";
export default {
  components: {
    MovieItem,
  },
  //   // moive.js의 state에 있는 movie[] 빈배열 데이터가 searchMovies()가
  //   // 동작해서 정보를 가지고 있는 새로운 데이터로 갱신되면 반응성이 유지된
  //   // 상태로 MovieList라는 컴포넌트에서 활용되어야하므로 계산된 데이터를
  //   // 처리하는 computed옵션에 정의
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    },
  },
};
</script>
