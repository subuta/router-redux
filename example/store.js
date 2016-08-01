import {createStore, applyMiddleware, compose} from 'redux';
import injectCreator from 'redux-virtual-dom';
import {routerMiddleware} from 'lib/index.js';

import reducer from './reducers/index.js';
const router = routerMiddleware(history);
const middlewares = [router];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// create inject for your store.
export const {inject, connect} = injectCreator(store);

window.store = store;

export default store;
