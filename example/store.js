import {createStore, applyMiddleware, compose} from 'redux';
import injectCreator from 'redux-virtual-dom';
import routerCreator, {routerMiddlewareCreator} from 'router-redux';
import {createBrowserHistory} from 'history/umd/history.js';

import reducer from './reducers/index.js';
const routerMiddleware = routerMiddlewareCreator({history: createBrowserHistory({basename: '/router-redux'})}) // add basename for github pages.
const middlewares = [routerMiddleware];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// create inject for your store.
export const {inject, connect} = injectCreator(store);
export const router = routerCreator(store);

export default store;
