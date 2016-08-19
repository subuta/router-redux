import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  initialRouteResolved,
  isHistoryAction
} from './actions.js';

import {
  getRoutes,
  routeErrorHandlerCreator
} from './router.js';

import {
  getCurrent,
  getIsInitalRouteResolved,
  transformToPath
} from './reducer.js';

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
    payload: transformToPath(location) // pass latest `path`
  };
};

export default (store) => (next) => (action) => {
  // use current state
  const {dispatch, getState} = store;
  const state = getState();
  const routeErrorHandler = routeErrorHandlerCreator(store);
  const currentPath = getCurrent(state);
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
    routes[currentPath].onLeave(state);
  }

  // call onEnter hook
  if (routes[nextPath] && routes[nextPath].onEnter) {
    // call initialRouteResolved action on initial onEnter call.
    const isInitalRouteResolved = getIsInitalRouteResolved(state);
    !isInitalRouteResolved && next(initialRouteResolved());

    // if onEnter accepts callback.
    if (routes[nextPath].onEnter.length == 2) {
      routes[nextPath].onEnter({dispatch, state}, (data = true) => {
        // return if routeError exists.
        if (routeErrorHandler(data)) return;
        // delay action dispatch until onEnter's callback called.
        action = callHistoryAndUpdateAction(history, action);
        next(action);
      });
      return;
    } else {
      routes[nextPath].onEnter({dispatch, state});
    }
  }

  // if onEnter not specified.
  action = callHistoryAndUpdateAction(history, action);
  next(action);
};
