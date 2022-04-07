import axios from "axios";
import {delay, put, takeLatest, all, fork} from "redux-saga/effects";
import {ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS} from "../reducers/post";
import {ADD_POST_TO_ME} from "../reducers/user";
import shortId from "shortid";


function addPostAPI(data) { //얘는 *붙이면 error 발생
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    yield delay(1000);
    const id = shortId.generate();
    // const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
      // data: result.data
    });
    yield put ({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) { //얘는 *붙이면 error 발생
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    yield delay(1000);
    // const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
      // data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchCommentPost() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga(){
  yield all([
    fork(watchAddPost),
    fork(watchCommentPost),
  ]);
}