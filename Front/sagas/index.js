import {all, fork, take, call, put} from "redux-saga/effects";
import axios from 'axios';
//all, fork 등은 saga effect

function logInAPI(data){ //얘는 *붙이면 error 발생
  return axios.post('/api/login', data)
}

function* logIn(action){
  try {
    const result = yield call(logInAPI, action.data); //call을 쓰는 이유? 테스트 하기가 좋아
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    });
  } catch (err){
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI(){ //얘는 *붙이면 error 발생
  return axios.post('/api/logout')
}

function* logOut(){
  try {
    const result = yield call(logInAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    });
  } catch (err){
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function addPostAPI(data){ //얘는 *붙이면 error 발생
  return axios.post('/api/post', data);
}

function* addPost(action){
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    });
  } catch (err){
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogIn(){
  yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut(){
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost(){
  yield take('ADD_POST_REQUEST', addPost);
}

//call, fork 둘다 함수 실행, 다른점 :
export default function* rootSaga(){ //generator
  yield all([ //배열안에 들어간 모든것을 실행
    fork(watchLogIn), //fork : 함수를 실행
    fork(watchLogOut),
    fork(watchAddPost),
  ])
}