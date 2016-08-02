import {createStore, applyMiddleware, compose} from 'redux';
import injectCreator from 'redux-virtual-dom';
import routerListenerCreator, {routerMiddlewareCreator} from 'lib/index.js';

import reducer from './reducers/index.js';
const middlewares = [routerMiddlewareCreator()];

const store = createStore(reducer, compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// create inject for your store.
export const {inject, connect} = injectCreator(store);
export const listener = routerListenerCreator(store);

// router.onEnter('/test', () => {
//   console.log('enter in test route!');
// });
//
// router.onLeave('/test', () => {
//   console.log('leave from test route...');
// });

export default store;
