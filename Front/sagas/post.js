import axios from "axios";import shortId from "shortid";
import {delay, put, takeLatest, all, fork} from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS, REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";

// function loadPostsAPI(data) {
//   return axios.get('/api/posts', data);
// }

// function* loadPosts(action) {
//   try {
//     // const result = yield call(loadPostsAPI, action.data);
//     yield delay(1000);
//     yield put({
//       type: LOAD_POSTS_SUCCESS,
//       data: generateDummyPost(10),
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOAD_POSTS_FAILURE,
//       data: err.response.data,
//     });
//   }
// }

function addPostAPI(data) { //얘는 *붙이면 error 발생
  return axios.post('/api/post', data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) { //얘는 *붙이면 error 발생
  return axios.delete('/api/post', data);
}

function* removePost(action) {
  try {
    yield delay(1000);
    // const result = yield call(removePostAPI, action.data);
    yield put({
      //post reducer 조작
      type: REMOVE_POST_SUCCESS,
      data: action.data, //삭제하는 게시글의 id가 들어가있음
      // data: result.data
    });
    //user reducer 조작
    yield put ({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.log(err)
    yield put({
      type: REMOVE_POST_FAILURE,
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

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchCommentPost() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga(){
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchCommentPost),
  ]);
}