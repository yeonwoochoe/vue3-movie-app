const axios = require("axios");
const { OMDB_API_KEY } = process.env;

exports.handler = async function (event) {
  //body라는 속성으로 payload를 받는것
  console.log(event);
  const payload = JSON.parse(event.body);
  //자바스크립트내 사용할 수있도록 문자데이터로 반환
  const { title, type, year, page, id } = payload;

  // console.log("OMDB_API_KEY: ", OMDB_API_KEY);
  // console.log("params: ", payload);

  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  try {
    const { data } = await axios.get(url);
    if (data.Error) {
      return {
        //잘못된 요청 에러 코드
        statusCode: 400,
        //문자 데이터만 반환이 가능
        body: data.Error,
      };
    }
    return {
      //정상적인 요청
      statusCode: 200,
      //data는 영화의 정보를 가져오는 객체데이터고, 문자데이터로 반환
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      //에러 객체에 상태코드 속성
      statusCode: error.response.status,
      body: error.message,
    };
  }
};
