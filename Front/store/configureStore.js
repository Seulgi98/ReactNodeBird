import { createWrapper } from 'next-redux-wrapper';
import {process} from "next/dist/server/web/sandbox/polyfills";
import {createStore} from "redux";

import reducer from '../reducers';

const configureStore = () => {
  const store = createStore(reducer);
  //action 을 하는 순간 reducer로 전달이 됨
  store.dispatch({
    type:'CHANGE_NICKNAME',
    data: 'Rupi'
  })
  return store;
};

const wrapper = createWrapper(configureStore, {debug: process.env.NODE_ENV === 'development',});

export default wrapper;