// middleware
import middleware from './middleware.js'
export const routerMiddleware = middleware;

// reducer
import * as reducer from './reducer.js'
import * as selector from './selector.js'
export const routerReducer = reducer.default;
export const {
  getCurrent,
  getLast,
  getNext,
  getRouteError,
  getIsLoading
} = selector;

// actions
import * as actions from './actions.js';
export const {
  push,
  replace,
  go,
  back,
  forward
} = actions;

import createRouter from './router.js';
export default createRouter;
