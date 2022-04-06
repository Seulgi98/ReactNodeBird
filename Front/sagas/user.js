import {all, delay, fork, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_FAILURE
} from "../reducers/user";
import signup from "../pages/signup";

//all, fork 등은 saga effect

function logInAPI(data) { //얘는 *붙이면 error 발생
  return axios.post('/api/login', data)
}

function* logIn(action) {
  try {
    yield delay(1000); //서버가 없어서 임시용
    // const result = yield call(logInAPI, action.data); ////call을 쓰는 이유? 테스트 하기가 좋아서
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
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
      type: LOG_OUT_SUCCESS,
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() { //얘는 *붙이면 error 발생
  return axios.post('/api/signUp')
}

function* signUp() {
  try {
    yield delay(1000);
    // const result = yield call(signUpAPI);
    yield put({
      type: SIGN_UP_SUCCESS,
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

//take : 일회성
//takeEvery : 다회성
//takeLatest : 실수로 누른건 무시되고 마지막만 실행
//takeReading : 처음꺼만 실행
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn); //yield take 일회용 => takeEvery 사용 (while true 사용한것과 동일)
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}