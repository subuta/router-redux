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
let history = window.history;

// TODO: basenameをonEnterとかmatchとかと合わせる。

// return cloned routes.
export const getRoutes = () => assign({}, routes);
export const getHistory = () => history;

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

const routerCreator = (store, option = {}) => {
  const {dispatch, getState} = store;

  // initialize routes.
  routes = {};

  const isUseCustomHistory = !!option.history;
  history = isUseCustomHistory ? option.history : window.history

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
    // if history has a location then use that.
    const location = isUseCustomHistory && history.location ? history.location : window.location
    dispatch(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));
  };

  let destroy = () => {};
  // if history.listen exists then use history.listen
  if (history.listen) {
    destroy = history.listen(onChange)
  } else {
    // bind onChange to popstate.
    window.addEventListener('popstate', onChange);
    destroy = () => window.removeEventListener('popstate', onChange);
  }

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
