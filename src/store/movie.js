import axios from "axios";
export default {
  //movie.js가 store에서 module화 되어서 사용할 수 있다라는것을 명시적로 보여줌.
  namespased: true,
  //data
  //state는 컴포넌트 간에 공유할 data 속성을 의미합니다
  state: () => ({ movies: [] }), //반환값이 객체데이터 하나이기떄문에 중괄호과 리턴 생략
  //상태를 활용해서 만드는 computed 계산된 데이터
  getters: {},
  //methods 와 비슷한개념
  //변이 state를 변경하는 것(state외에는 변경불가능)
  mutations: {
    resetMovies(state) {
      state.movies = [];
    },
  },
  //비동기로 동작
  actions: {
    async searchMovies(context, payload) {
      const { title, type, number, year } = payload;
      const OMDB_API_KEY = "7035c60C";
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      );
      const { Search, totalResults } = res.data;
    },
  },
};
