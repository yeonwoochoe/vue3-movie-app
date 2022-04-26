import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes"; //index.js 생략가능
import store from "./store"; //index.js 생략가능
// use: 현재 프로젝트(vue.js)에 특정한 플러그인, 라이브러리를 연결할 때 사용
createApp(App)
  .use(router) // $route, $router
  .use(store)
  .mount("#app");
