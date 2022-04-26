import axios from "axios";
import _uniqBy from "lodash/uniqBy";
export default {
  //movie.js가 store에서 module화 되어서 사용할 수 있다라는것을 명시적로 보여줌.
  namespaced: true,
  //data
  //state는 컴포넌트 간에 공유할 data 속성을 의미합니다
  state: () => ({ movies: [] }), //반환값이 객체데이터 하나이기떄문에 중괄호과 리턴 생략
  //상태를 활용해서 만드는 computed 계산된 데이터
  getters: {},
  //methods 와 비슷한개념
  //변이 state를 변경하는 것(state외에는 변경불가능)
  // 통합적으로 state의 데이터들을 갱신할수 있는 로직
  // (state 데이터에 접근할 수 있는 매개변수,
  //  payload 특정 데이터를 받아서 갱신)
  mutations: {
    updateState(state, payload) {
      //['movies', 'message','loading'] 배열데이터 반환
      // eslint-disable-next-line prettier/prettier
      Object.keys(payload).forEach(key => {
        //동적은 로직 구성 가능
        // state.movies = payload.movies
        // state['movies'] = payload['movies']
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  //비동기로 동작
  actions: {
    // store의 각멤버 state, getters, mutations를 활용할 수 있게 context제공
    // searchMovies가 실행될 때 인수로 들어온 특정 데이터들을 payload로 받아줄 수 있음
    // commit, state가 context 내부에 들어있기때문에 객체구조분해를 통해
    // 매개변수에 할당 {state, commit}
    async searchMovies({ state, commit }, payload) {
      const { title, type, number, year } = payload;
      const OMDB_API_KEY = "7035c60c";
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`
      );
      console.log(number);
      const { Search, totalResults } = res.data;
      commit("updateState", {
        movies: _uniqBy(Search, "imdbID"),
      });
      console.log(res.data); //350
      console.log(totalResults); //350
      console.log(typeof totalResults); //string
      // 10진법의 숫자로 정수로 만들어서 total에 할당
      const total = parseInt(totalResults, 10);
      const pageLength = Math.ceil(total / 10);
      // 영화의 개수가 10개 이상이 될 때 페이지 추가 요청
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1) {
          if (page > number / 10) {
            break;
          }
          const res = await axios.get(
            `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
          );
          const { Search } = res.data;
          commit("updateState", {
            // 새로운 요청이 들어갈 때마다 새로운 배열데이터를 만들어서 movies에 할당
            movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
          });
        }
      }
    },
  },
};
