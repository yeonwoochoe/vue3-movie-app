<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <!-- navigations라는 아이템을 반복적으로 출력하고 각각아이템을 nav로 활용 -->
      <!-- :key 각각의 아이템이 고유하다는 의미 -->
      <div v-for="nav in navigations" :key="nav.name" class="nav-item">
        <!-- RouterLink => a태그 대신 사용 -->
        <!-- RouterLink라는 컴포넌트로 현재페이지가 어떤 네비게이션 부분에서
        활성화가 될 수 있는지에 대한 내용을 클래스를 부여하는 것으로 확인 가능 -->
        <!-- isMatch메소드 인수로 들어와서 true로 들어오면 active활성화-->
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link"
        >
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "~/components/Logo";
export default {
  components: {
    Logo,
  },
  data() {
    return {
      navigations: [
        {
          name: "Search",
          href: "/",
        },
        {
          name: "Movie",
          href: "/movie/tt4520988",
          path: /^\/movie/,
          // \ 뜻은 일반적인 정규표현식에 슬래쉬가 아닌 일반 슬래쉬로 쓰기 위한 트릭?
          //정규표현식 : /movie로 시작하는 경로인 경우 모두 일치시키겠다.
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
  },
  methods: {
    // /movie와 일치하면 내비게이션 버튼을 활성화해줌
    isMatch(path) {
      if (!path) {
        return false;
      } //중괄호 생략가능하지만..난헷갈리니까 생략안함
      console.log(this.$route);
      return path.test(this.$route.fullPath);
      //test()함수는 불린데이터를 반환
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
}
</style>
