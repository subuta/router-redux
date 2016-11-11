// middleware
import middleware, { routerMiddlewareCreator as _routerMiddlewareCreator } from './middleware.js';
export const routerMiddleware = middleware;
export const routerMiddlewareCreator = _routerMiddlewareCreator;

// reducer
import * as reducer from './reducer.js'
import * as selector from './selector.js'
export const routerReducer = reducer.default;
export const {
  getCurrent,
  getLast,
  getNext,
  getRouteError,
  getIsInitalRouteResolved
} = selector;

import _match from './match.js'
export const match = _match;

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
