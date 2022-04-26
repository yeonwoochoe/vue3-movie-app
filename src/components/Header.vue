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
        <RouterLink :to="nav.href" active-class="active" class="nav-link">
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
          href: "/movie",
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    };
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
