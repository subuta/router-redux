import assign from 'object-assign';

import {
  routeChange,
  routeError,
  initialRouteResolved
} from './actions.js';

import {
  getCurrent
} from './reducer.js';

import match from './match.js';

let routes = {};

// return cloned routes.
export const getRoutes = () => assign({}, routes);

export const matchRoute = (path) => {
  const routes = Object.keys(getRoutes());

  for (let i = 0; i < routes.length; i++) {
    const key = routes[i];
    if (match(key, path)) return getRoutes()[key]; // return matched route.
  }
  // return null if not found
  return null;
};

// check and handle routeError
export const routeErrorHandlerCreator = (store) => (data) => {
  const {dispatch, getState} = store;
  const state = getState();
  const routes = getRoutes();

  // if called with falsy data(includes Error)
  if (!data || data instanceof Error) {
    dispatch(routeError(data));

    if (routes.Error) {
      // call error handler.
      routes.Error({dispatch, state});
    } else {
      // put some messages with no onError handler.
      console.warn('You should register router.onError to handle this routing error. data =', data);
    }
    return true;
  }

  return false;
};

const routerCreator = (store) => {
  const {dispatch, getState} = store;
  const state = getState();
  const routeErrorHandler = routeErrorHandlerCreator(store);

  // initialize routes.
  routes = {};

  // call on Route enter.
  const onError = (handler) => {
    routes.Error = handler;
  };

  // call on Route enter.
  const onEnter = (path, handler) => {
    routes[path] = routes[path] || {};
    routes[path] = {
      ...routes[path],
      onEnter: handler
    };

    const currentPath = getCurrent(state) && getCurrent(state).path;
    const currentRoute = matchRoute(currentPath);

    if (currentRoute) {
      // if handler accepts callback.
      if (currentRoute.onEnter.length == 2) {
        currentRoute.onEnter({dispatch, state}, (data = true) => {
          dispatch(initialRouteResolved());
          routeErrorHandler(data);
        });
      } else {
        currentRoute.onEnter({dispatch, state});
      }
    }
  };

  // call on Route leave.
  const onLeave = (pathname, handler) => {
    routes[pathname] = routes[pathname] || {};
    routes[pathname] = {
      ...routes[pathname],
      onLeave: handler
    };
  };

  const onChange = (e) => {
    dispatch(routeChange(location));
  };

  // bind onChange to popstate.
  window.addEventListener('popstate', onChange);
  const destroy = () => window.removeEventListener('popstate', onChange);

  return {
    onEnter,
    onError,
    onLeave,
    destroy
  }
};

export default routerCreator;
