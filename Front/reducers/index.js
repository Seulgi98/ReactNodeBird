// 초기 state
import {store} from "next/dist/build/output/store";

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  }
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}

// async action creator
// action creator

// (이전상태, 액션) => 다음상태
// reducer가 길어지면 나눌수 있음
const rootReducer = (state = initialState, acticon) => {
  switch (acticon.type) {
    // action을 받아서 다음 state로 바뀜. init state와 다른 state가 생성됨.
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user, //object 스프레드로 참조관계 유지
          isLoggedIn: true,
          user: acticon.data,
        }
      }
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user, //object 스프레드로 참조관계 유지
          isLoggedIn: false,
          user: null,
        }
      }
  }
};

export default rootReducer;