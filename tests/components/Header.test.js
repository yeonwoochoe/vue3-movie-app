import { shallowMount } from "@vue/test-utils";
import store from "~/store";
import router from "~/routes";
import Header from "~/components/Header";

//test 진행할 파일 명시
describe("components/Header.vue", () => {
  //계속 재할당 할 수 있도록 전역화
  let wrapper;

  //각 test()가 실행되기 직전에 동작
  beforeEach(async () => {
    window.scrollTo = jest.fn(); // Mock 모의함수
    router.push("/movie/tt1234567");
    await router.isReady();
    wrapper = shallowMount(Header, {
      global: {
        plugins: [store, router],
      },
    });
  });

  test("경로 정규표현식이 없는 경우 일치하지 않습니다", () => {
    // 설정
    const regExp = undefined;
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });

  test("경로 정규표현식과 일치해야 합니다", () => {
    // 설정
    const regExp = /^\/movie/;
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(true);
  });

  test("경로 정규표현식과 일치하지 않아야 합니다", () => {
    // 설정
    const regExp = /^\/yeonwoo/;
    // 동작
    // 확인
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });
});
