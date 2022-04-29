<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute />
      <img :src="image" :alt="name" />
    </div>
    <div class="name">{{ name }}</div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "~/components/Loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      imageLoading: true,
    };
  },
  computed: {
    //모듈명시와, 배열데이터 추가하여 내가 가져올 상태(데이터)명을 표시하여 이 내용들이 computed로 객체데이터로 반환이 되어
    //그 객체데이터를  전개연산자로 등록하여 쓰는 것!
    //직접 mapState 를 할당하는 것보다는 전개연산자를 통해 computed 객체데이터 내부에 쓰는것을 추천.
    ...mapState("about", ["image", "name", "email", "blog", "phone"]),

    // image() {
    //   return this.$store.state.about.image;
    // },
    // name() {
    //   return this.$store.state.about.name;
    // },
    // email() {
    //   return this.$store.state.about.email;
    // },
    // blog() {
    //   return this.$store.state.about.blog;
    // },
    // phone() {
    //   return this.$store.state.about.phone;
    // },
  },
  // 라이프사이클에선 비동기를 사용할 수 없기때문에
  //별도의 메소드 옵션을 사용하여 비동기식 로직을 사용하고 그로직을
  //불러와서 실행하는것으로 쓸 수 있음
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$loadImage(this.image);
      this.imageLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
  div {
    padding: 3px 0;
  }
}
</style>
