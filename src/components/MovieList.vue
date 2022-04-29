<template>
  <div class="container">
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <Loader v-if="loading" />
      <!-- !movie.length(영화의 목록이 없으면) 없으면 true로 바인딩이 되고 , false 면 바인딩이 되지 않는다. -->
      <div v-if="message" class="message">
        {{ message }}
      </div>
      <div v-else class="movies">
        <!-- if조건문이 false 라면 보이는것 -->
        <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MovieItem from "~/components/MovieItem";
import Loader from "~/components/Loader";
export default {
  components: {
    MovieItem,
    Loader,
  },
  //   // moive.js의 state에 있는 movie[] 빈배열 데이터가 searchMovies()가
  //   // 동작해서 정보를 가지고 있는 새로운 데이터로 갱신되면 반응성이 유지된
  //   // 상태로 MovieList라는 컴포넌트에서 활용되어야하므로 계산된 데이터를
  //   // 처리하는 computed옵션에 정의
  computed: {
    ...mapState("movie", ["movies", "message", "loading"]),
    // movies() {
    //   return this.$store.state.movie.movies;
    // },
    // message() {
    //   return this.$store.state.movie.message;
    // },
    // loading() {
    //   return this.$store.state.movie.loading;
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
