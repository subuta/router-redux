import {
  routeChange,
  routeError,
  initialRouteResolved,
  transformLocationToPath,
  getQuery
} from './actions.js';

import {
  getCurrent
} from './selector.js';

import match from './match.js';
import assign from './assign.js';

let routes = {};

// return cloned routes.
export const getRoutes = () => assign({}, routes);

export const findRouteKeyByPath = (path) => {
  const routes = Object.keys(getRoutes());
  for (let i = 0; i < routes.length; i++) {
    const key = routes[i];
    if (match(key, path)) return key; // return matched route.
  }
  return null; // return null if not found
};

export const createRoute = (path, query = '') => {
  const route = findRouteKeyByPath(path);
  const params = match(route, path);
  return {
    path,
    route,
    params,
    query
  }
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

const routerCreator = (store) => {
  const {dispatch, getState} = store;
  const routeErrorHandler = routeErrorHandlerCreator(store);

  // initialize routes.
  routes = {};

  // delay until onEnter registered.
  requestAnimationFrame(() => {
    // set initial route.
    dispatch(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));
    // call current route's onEnter.
    const currentPath = getCurrent(getState()) && getCurrent(getState()).path;
    const currentRoute = findRouteKeyByPath(currentPath);

    if (routes[currentRoute] && routes[currentRoute].onEnter) {
      // if handler accepts callback.
      if (routes[currentRoute].onEnter.length == 2) {
        routes[currentRoute].onEnter({dispatch, state: getState()}, (data = true) => {
          dispatch(initialRouteResolved());
          routeErrorHandler(data);
        });
      } else {
        routes[currentRoute].onEnter({dispatch, state: getState()});
      }
    }
  });

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
    dispatch(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));
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
