import {
  routeChange
} from './actions.js';

import historyCreator from './history.js';
import match from './match.js';
import assign from './assign.js';

let routes = {};
let history = null;

// return cloned routes.
export const getRoutes = () => assign({}, routes);
export const getHistory = () => history;

export const findRouteKeyByPath = (path) => {
  const routes = Object.keys(getRoutes());
  for (let i = 0; i < routes.length; i++) {
    const key = routes[ i ];
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
  const { dispatch } = store;

  // initialize routes.
  routes = {};
  history = historyCreator(option.history)

  // call on Route enter.
  const onError = (handler) => {
    routes.Error = handler;
  };

  // call on Route enter.
  const onEnter = (path, handler) => {
    routes[ path ] = routes[ path ] || {};
    routes[ path ] = {
      ...routes[ path ],
      onEnter: handler
    };
  };

  // call on Route leave.
  const onLeave = (path, handler) => {
    routes[ path ] = routes[ path ] || {};
    routes[ path ] = {
      ...routes[ path ],
      onLeave: handler
    };
  };

  const onChange = () => {
    // if history has a location then use that.
    const location = history.getLocation()
    dispatch(routeChange(createRoute(location.pathname, location.search)));
  };

  let destroy = history.listen(onChange);

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
