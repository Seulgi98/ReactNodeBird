import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import reducer from '../reducers';

const configureStore = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  //action 을 하는 순간 reducer로 전달이 됨
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;