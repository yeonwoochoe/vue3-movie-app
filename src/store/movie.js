/* eslint-disable prettier/prettier */
import axios from "axios";
import _uniqBy from "lodash/uniqBy";

const _defaultMessage = "Search for the movie title!";

export default {
  //movie.js가 store에서 module화 되어서 사용할 수 있다라는것을 명시적로 보여줌.
  namespaced: true,
  //data
  //state는 컴포넌트 간에 공유할 data 속성을 의미합니다
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }), //반환값이 객체데이터 하나이기떄문에 중괄호과 리턴 생략
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
      Object.keys(payload).forEach(key => {
        //동적은 로직 구성 가능
        // state.movies = payload.movies
        // state['movies'] = payload['movies']
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    },
  },
  //비동기로 동작
  actions: {
    // store의 각멤버 state, getters, mutations를 활용할 수 있게 context제공
    // searchMovies가 실행될 때 인수로 들어온 특정 데이터들을 payload로 받아줄 수 있음
    // commit, state가 context 내부에 들어있기때문에 객체구조분해를 통해
    // 매개변수에 할당 {state, commit}
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return; //중괄호 생략

      //최초 searchMovies 실행 되게 되면 우선 loading 초기값이 false 이기때문에  if 조건문이
      //실행되지 않고 아래 구문으로 내려가게되고, commit을 만나 loading값이 다시 true로 갱신되면서
      //아래 로직이 순차적으로 실행되가는데, 이 상태에서 사용자가 엔터키를 누른다거나, apply버튼을 누를경우,
      //또 searchMovies가 실행되기때문에 if조건문이 true로 조건문에 걸리면서 return에 걸려 아래 로직이
      //실행되지 않게 되는 구조로 searchMovies 함수가 여러번 동작이 되는 것을 방지
      //함수에서 `조건문 & return`을 사용하면, 아래의 코드를 실행시키지 않을 수 있다.
      commit("updateState", {
        message: "",
        loading: true,
      });
      try {
        const res = await _fetchMovie({
          ...payload,
          psge: 1,
        });
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
            if (page > payload.number / 10) {
              break;
            }
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit("updateState", {
              // 새로운 요청이 들어갈 때마다 새로운 배열데이터를 만들어서 movies에 할당
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch ({ message }) {
        //netlify로 중간 서버로 거치기때문에 단순 메시지가 아닌 에러객체로 반환하기때문에 error.message로
        //바꿔줘야하는데 여기서 객체구조분해로 바로 객체로 꺼내오는것.
        commit("updateState", {
          // 검색이 시작되면 기본값이 지워지고 메세지가 초기화 되도록 함
          movies: [],
          message,
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
    // 영화 하나의 상세정보 가져오기
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return; //중괄호 생략
      commit("updateState", {
        // 기존에 검색된 영화의 상세목록이 잠깐이라도 화면에 출력되는걸 방지
        theMovie: {},
        loading: true,
      });
      try {
        // payload를 통해 id 영화의 imdbID라는 고유값을 가져옴
        const res = await _fetchMovie(payload);
        console.log(res);
        commit("updateState", {
          theMovie: res.data,
        });
      } catch (error) {
        commit("updateState", {
          // 영화의 상세정보를 가져오지 못하면 빈객체상태로 만듬
          theMovie: {},
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

async function _fetchMovie(payload) {
  // axios.get payload의 여러 데이터들을 쿼리스트링으로 풀어서 작성
  // axios.post payload를 포함하는 것으로도 전송가능
  return await axios.post("/.netlify/functions/movie", payload);
}

// function _fetchMovie(payload) {
//   //{title: 'frozen', type: 'movie', number: 10, year: '', psge: 1}
//   console.log(payload);
//   const { title, type, year, page, id } = payload;
//   const OMDB_API_KEY = "7035c60c";
//   // 삼항연산자로 id라는 속성에 데이터가 있으면 단일영화정보의 상세내용을
//   // 없으면 다수의 영화정보를 가져옴
//   const url = id
//     ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
//     : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
//   // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;
//   //api키만 있는 경우 reject가 호출되는 것이 맞지만 서버에서 자체적으로  then에서
//   //처리가 되는 문제가 생긴다.
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url)
//       .then(res => {
//         if (res.data.Error) {
//           reject(res.data.Error);
//         }
//         resolve(res);
//       })
//       .catch(err => {
//         //에러가 발생하면 에러 객체에서 에러 메시지 부분만 추출하여 fetch함수에 reject에 걸어놨고
//         //이부분이 위 catch문에 에러가 걸리게 되고 거기서 에러메시지를 commit을 통해 갱신할 수 있는 구조
//         reject(err.message);
//       });
//   });
// }
