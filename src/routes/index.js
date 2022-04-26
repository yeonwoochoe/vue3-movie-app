import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import About from "./About";
import Movie from "./Movie";

export default createRouter({
  // Hash모드 , History모드 ( Hash모드 사용)
  // Hash모드 http://google.com/#/search  #을 붙여서 페이지에 접근
  // 사용이유: 특정페이지에서 새로고침을 햇을 때 페이지를 찾을 수 없다는 메세지 방지
  history: createWebHashHistory(),
  //page들을 구분해주는?옵션
  routes: [
    {
      // page를 구분해주는 경로
      // http://google.com/  /기호: 가장 메인페이지로 접근하겠다는 의미
      // component: 메인페이지로 이동했을 때 어떤 vue.js의 컴포넌트를 사용할지 명시
      path: "/", //경로의미
      component: Home,
    },
    {
      path: "/movie",
      component: Movie,
    },
    {
      // http://google.com/about 이라는 페이지로 이동
      // 그때 연결된 vue.js의 컴포넌트가 적용
      path: "/about",
      component: About,
    },
  ],
});
