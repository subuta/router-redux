import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  transformLocationToPath,
  initialRouteResolved,
  isHistoryAction,
  setNextRoute,
  getQuery
} from './actions.js';

import {
  getRoutes,
  routeErrorHandlerCreator,
  createRoute
} from './router.js';

import {
  getCurrent,
  getIsInitalRouteResolved
} from './selector.js';

// call history api.
const callHistoryAndUpdateAction = (history, action) => {
  if (action.type === PUSH) {
    history.pushState(null, null, action.payload);
  } else if (action.type === REPLACE) {
    history.replaceState(null, null, action.payload);
  } else if (action.type === GO) {
    history.go(action.payload);
  } else if (action.type === BACK) {
    history.back();
  } else if (action.type === FORWARD) {
    history.forward();
  }
  // if history action then override payload as location
  return {
    ...action,
    payload: createRoute(transformLocationToPath(location), getQuery(location)) // pass latest `path`
  };
};

export default (store) => (next) => (action) => {
  // use current state
  const {dispatch, getState} = store;
  const routeErrorHandler = routeErrorHandlerCreator(store);
  const currentPath = getCurrent(getState()) && getCurrent(getState()).path;
  const history = window.history;

  // pass-through other action.
  if (!isHistoryAction(action.type)) {
    next(action);
    return;
  }

  // ignore push/replace to current location.
  if ((action.type === PUSH || action.type === REPLACE) && currentPath === action.payload) {
    return;
  }

  const routes = getRoutes();
  const nextPath = action.payload;

  // call onLeave hook
  if (routes[currentPath] && routes[currentPath].onLeave) {
    routes[currentPath].onLeave(getState());
  }

  // call onEnter hook
  if (routes[nextPath] && routes[nextPath].onEnter) {
    // call initialRouteResolved action on initial onEnter call.
    const isInitalRouteResolved = getIsInitalRouteResolved(getState());
    !isInitalRouteResolved && next(initialRouteResolved());
    next(setNextRoute(createRoute(nextPath)));

    // if onEnter accepts callback.
    if (routes[nextPath].onEnter.length == 2) {
      routes[nextPath].onEnter({dispatch, state: getState()}, (data = true) => {
        // return if routeError exists.
        if (routeErrorHandler(data)) return;
        // delay action dispatch until onEnter's callback called.
        action = callHistoryAndUpdateAction(history, action);
        next(action);
      });
      return;
    } else {
      routes[nextPath].onEnter({dispatch, state: getState()});
    }
  }

  // if onEnter not specified.
  action = callHistoryAndUpdateAction(history, action);
  next(action);
};
