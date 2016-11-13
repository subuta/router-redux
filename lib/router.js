import {
  locationChange
} from './actions.js';

import {
  getCurrent,
  getNext,
} from './selector.js';

import match from './match.js';
import createHistory from './history.js';

import {
  parseLocation
} from './location.js';

// keep routes outside of the function to access from middleware.
let routes = {};
let history = createHistory();

// return cloned routes.
export const getRoutes = () => Object.assign({}, routes);
export const getHistory = () => history;

export const findRouteKeyByPath = (path) => {
  const routes = Object.keys(getRoutes());
  for (let i = 0; i < routes.length; i++) {
    const key = routes[ i ];
    if (match(key, path)) return key; // return matched route.
  }
  return null; // return null if not found
};

// add route/params to location.
export const enrichLocation = ({ pathname, search }) => {
  const route = findRouteKeyByPath(pathname);
  const params = match(route, pathname);
  return {
    pathname,
    search,
    route,
    params
  }
};

// router
export default (store, option = {}) => {
  const { dispatch, getState, subscribe } = store;
  // initialize routes.
  routes = {};
  // initialize history.
  history = createHistory(option.history);

  let isTimeTravel = false;

  const on = (pathname, route) => {
    // arrow pass render function directly.
    if (typeof route === 'function') {
      route = { render: route }
    }
    routes[ pathname ] = Object.assign({}, route);

    // set current on initial render
    const location = history.getLocation();
    if (location.pathname === pathname) {
      dispatch(locationChange(pathname))
    }
  }

  const render = () => {
    const route = getCurrent(getState()) && getCurrent(getState()).route;
    const currentRoute = routes[ route ];
    return currentRoute ? currentRoute.render() : null;
  }

  const unsubscribe = subscribe(() => {
    // TODO: fix bug on replay.(おそらくstore.subscribe内でdispatchするのは考慮されてない？)
    const pathname = getNext(getState()) && getNext(getState()).pathname;
    if (pathname) {
      dispatch(locationChange(pathname));
    }
  });

  const destroy = () => {
    unsubscribe();
  }

  return {
    on,
    render,
    destroy
  }
}
