import {all, fork, takeEvery, call, put, takeLatest, delay} from "redux-saga/effects";
import axios from 'axios';

//all, fork 등은 saga effect

function logInAPI(data) { //얘는 *붙이면 error 발생
  return axios.post('/api/login', data)
}

function* logIn(action) {
  try {
    yield delay(1000); //서버가 없어서 임시용
    // const result = yield call(logInAPI, action.data); ////call을 쓰는 이유? 테스트 하기가 좋아서
    yield put({
      type: 'LOG_IN_SUCCESS',
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() { //얘는 *붙이면 error 발생
  return axios.post('/api/logout')
}

function* logOut() {
  try {
    yield delay(1000);
    // const result = yield call(logOutAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function addPostAPI(data) { //얘는 *붙이면 error 발생
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}
//take : 일회성
//takeEvery : 다회성
//takeLatest : 실수로 누른건 무시되고 마지막만 실행
//takeReading : 처음꺼만 실행
function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn); //yield take 일회용 => takeEvery 사용 (while true 사용한것과 동일)
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

//call, fork 둘다 함수 실행, 다른점 :
export default function* rootSaga() { //generator
  yield all([ //배열안에 들어간 모든것을 실행
    fork(watchLogIn), //fork : 함수를 실행
    fork(watchLogOut),
    fork(watchAddPost),
  ])
}