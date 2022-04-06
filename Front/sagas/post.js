import axios from "axios";
import {delay, put, takeLatest, all, fork} from "redux-saga/effects";

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


function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga(){
  yield all([
    fork(watchAddPost),
  ]);
}