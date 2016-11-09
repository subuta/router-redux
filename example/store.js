import {createStore, applyMiddleware, compose} from 'redux';
import injectCreator from 'redux-virtual-dom';
import routerCreator, {routerMiddleware} from 'router-redux';

import reducer from './reducers/index.js';
const middlewares = [routerMiddleware];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// create inject for your store.
export const {inject, connect} = injectCreator(store);
export const router = routerCreator(store);

export default store;
