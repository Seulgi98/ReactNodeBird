import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "redux";
//reducer 불러오기
import user from "./user";
import post from "./post";


// (이전상태, 액션) => 다음상태
// reducer 합치기
const rootReducer = combineReducers ({
  index: (state = {}, action) => {
    switch (action.type) {
      // action을 받아서 다음 state로 바뀜. init state와 다른 state가 생성됨.
      case HYDRATE:
        console.log('HYDRATE :', action);
        return {...state, ...action.payload};
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;