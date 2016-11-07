import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  transformLocationToPath,
  initialRouteResolved,
  isHistoryAction,
  isRouteAction,
  setNextRoute,
  getQuery
} from './actions.js';

import {
  getRoutes,
  routeErrorHandlerCreator,
  createRoute,
  findRouteKeyByPath
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
  const current = getCurrent(getState()) && getCurrent(getState());
  const currentRoute = findRouteKeyByPath(current && current.path);
  const history = window.history;

  // pass-through other action.
  if (!isHistoryAction(action.type) && !isRouteAction(action.type)) {
    next(action);
    return;
  }

  // ignore push/replace to same location.
  const currentPath = current.query ? `${current.path}?${current.query}` : current.path;
  if ((action.type === PUSH || action.type === REPLACE) && currentPath === action.payload) {
    return;
  }

  const routes = getRoutes();
  const _next = action.payload;
  const nextPath = _next && _next.path ? _next.path : _next;
  const nextRoute = findRouteKeyByPath(nextPath);

  // call onLeave hook
  if (routes[currentRoute] && routes[currentRoute].onLeave) {
    routes[currentRoute].onLeave({dispatch, state: getState()});
  }

  // call onEnter hook
  if (routes[nextRoute] && routes[nextRoute].onEnter) {
    // call initialRouteResolved action on initial onEnter call.
    const isInitalRouteResolved = getIsInitalRouteResolved(getState());
    !isInitalRouteResolved && next(initialRouteResolved());
    next(setNextRoute(createRoute(nextPath, nextPath.split('?')[1])));

    // if onEnter accepts callback.
    if (routes[nextRoute].onEnter.length == 2) {
      routes[nextRoute].onEnter({dispatch, state: getState()}, (data = true) => {
        // return if routeError exists.
        if (routeErrorHandler(data)) return;
        // delay action dispatch until onEnter's callback called.
        action = callHistoryAndUpdateAction(history, action);
        next(action);
      });
      return;
    } else {
      routes[nextRoute].onEnter({dispatch, state: getState()});
    }
  }

  // if onEnter not specified.
  action = callHistoryAndUpdateAction(history, action);
  next(action);
};
