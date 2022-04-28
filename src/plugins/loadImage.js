/* eslint-disable prettier/prettier */
export default {
  install(app) {
    //$loadImage 함수가 실행하게 되면 객체 하나가 반환이 되는데
    //load가 끝나면 resolve()가 실행이 보장되는 구조
    //정말 당연한건데 그 당연한 오류를 꼐속 놓쳤다.,.
    //내가 검색한 api내용은 캐싱되서 남아있기대문에 이미 기록된걸 검색해서 로딩이 되어보이지
    //않는것뿐이었는데 오타가 있는줄알고 계속 검색했다...바본가..하나배워간다...

    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        const img = document.createElement("img");
        img.src = src;
        img.addEventListener("load", () => {
          resolve();
        });
      });
    };
  },
};

// 이 내용을 공용으로 쓸수 있게 위처럼 만듬
// init() {
// const img = document.createElement('img')
// // 영화의 포스터 정보가 삽입
// img.src = this.movie.Poster
// // function키워드로 작성하게되면 this가 imageLoading으로 접근불가
// // 화살표 함수로 해야 view파일 내에서 사용할 수 있는 여러가지
// // 데이터, 메소드에 접근가능
// img.addEventListener('load', () => {
//   this.imageLoading = false
// })
// }
