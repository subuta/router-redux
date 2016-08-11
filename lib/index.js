// middleware
import middleware from './middleware.js'
export const routerMiddleware = middleware;

// reducer
import * as reducer from './reducer.js'
export const routerReducer = reducer.default;
export const {
  getCurrent,
  getLast,
  getIsInitalRouteResolved
} = reducer;

// actions
import * as actions from './actions.js';
export const {
  push,
  replace,
  go,
  back,
  forward
} = actions;

import routerCreator from './router.js';
export default routerCreator;
