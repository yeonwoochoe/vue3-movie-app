<template>
  <Header />
  <!-- vue-router에서 제공하는 전체영역에서 쓸 수있는 전역화 되어있는 컴포넌트, 각 페이지 출력 -->
  <!-- 페이지가 바뀔때마다 RouterView 출력, 헤더부분은 바뀌지 않고 동일하게 출력 -->
  <!-- 변경되는 페이지의 내용을 해당하는 RouterView라는 컴포넌트 부분에 출력 -->
  <RouterView />
</template>
<script>
import Header from "~/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "~/scss/main.scss";
</style>
