import {all, fork} from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";



export default function* rootSaga() { //generator
  yield all([ //배열안에 들어간 모든것을 실행
    fork(postSaga), //fork : 함수를 실행
    fork(userSaga),
  ]);
}