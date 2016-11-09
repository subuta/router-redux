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
  routeError,
  getQuery
} from './actions.js';

import {
  getRoutes,
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

// check and handle routeError
export const routeErrorHandlerCreator = (store) => (data) => {
  const {dispatch, getState} = store;
  const routes = getRoutes();

  // if called with falsy data(includes Error)
  if (!data || data instanceof Error) {
    dispatch(routeError(data));

    if (routes.Error) {
      // call error handler.
      routes.Error({dispatch, state: getState()});
    } else {
      // put some messages with no onError handler.
      console.warn('You should register router.onError to handle this routing error. data =', data);
    }
    return true;
  }

  return false;
};

export default (store) => (next) => (action) => {
  // use current state
  const {dispatch, getState} = store;
  const routeErrorHandler = routeErrorHandlerCreator(store);
  const current = getCurrent(getState());
  const currentRoute = findRouteKeyByPath(current && current.path);
  // call initialRouteResolved action on initial onEnter call.
  const isInitalRouteResolved = getIsInitalRouteResolved(getState());
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

  // should call onLeave hook if not has a nextRoute(after routeChange)
  if (isInitalRouteResolved && routes[currentRoute] && routes[currentRoute].onLeave) {
    routes[currentRoute].onLeave({dispatch, state: getState()});
  }

  // call onEnter hook
  if (routes[nextRoute] && routes[nextRoute].onEnter) {
    next(setNextRoute(createRoute(nextPath, nextPath.split('?')[1])));

    // if onEnter accepts callback.
    if (routes[nextRoute].onEnter.length == 2) {
      routes[nextRoute].onEnter({dispatch, state: getState()}, (data = true) => {
        !isInitalRouteResolved && next(initialRouteResolved());
        // return if routeError exists.
        if (routeErrorHandler(data)) return;
        // delay action dispatch until onEnter's callback called.
        action = callHistoryAndUpdateAction(history, action);
        next(action);
      });
      return;
    } else {
      routes[nextRoute].onEnter({dispatch, state: getState()});
      !isInitalRouteResolved && next(initialRouteResolved());
    }
  }

  // if onEnter not specified.
  action = callHistoryAndUpdateAction(history, action);
  next(action);
};
