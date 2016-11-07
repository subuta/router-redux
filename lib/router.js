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

const routerCreator = (store) => {
  const {dispatch, getState} = store;

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
  };

  // call on Route leave.
  const onLeave = (path, handler) => {
    routes[path] = routes[path] || {};
    routes[path] = {
      ...routes[path],
      onLeave: handler
    };
  };

  const onChange = () => {
    dispatch(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));
  };

  // bind onChange to popstate.
  window.addEventListener('popstate', onChange);
  const destroy = () => window.removeEventListener('popstate', onChange);

  // delay until onEnter registered.
  requestAnimationFrame(() => {
    // set initial route.
    onChange();
  });

  return {
    onEnter,
    onError,
    onLeave,
    destroy
  }
};

export default routerCreator;
