export default {
  namespaced: true,
  //하나의 데이터, 함수로 만드는 이유는 객체데이터는 배열데이터와 동일하게 참조형 데이터이기때문에
  //데이터의 불변성을 유지해주기 위해 state 내부에 안에 데이터가 고유해질 수있도록 해주는것
  state: () => ({
    name: "Choe Yeon Woo",
    email: "chiyy6162@gmail.com",
    blog: "개편중",
    phone: "+82-10-9999-9999",
    image: "../images/my-emotion.png",
  }),
};
