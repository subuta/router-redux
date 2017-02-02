import {createStore, applyMiddleware, compose} from 'redux';
import injectCreator from 'redux-virtual-dom';
import createRouter, {routerMiddleware} from 'router-redux';
import createHistory from 'history/createBrowserHistory'
const history = createHistory({basename: '/react'});

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// create inject for your store.
export const {inject, connect} = injectCreator(store);
export const router = createRouter(store, {history});

export default store;
