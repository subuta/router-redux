import {createStore, applyMiddleware, compose} from 'redux';
import injectCreator from 'redux-virtual-dom';
import routerCreator, {routerMiddleware} from 'router-redux';
import {createBrowserHistory} from 'history/umd/history.js';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// create inject for your store.
export const {inject, connect} = injectCreator(store);
export const router = routerCreator(store, {history: createBrowserHistory({basename: '/router-redux'})}); // add basename for github pages.

export default store;
