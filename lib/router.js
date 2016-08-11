import {
  routeChange,
  routeError,
  initialRouteResolved
} from './actions.js';

import {
  getCurrent
} from './reducer.js';

let routes = {};

// TODO: onErrorを足す。(Error時のURLを足すのも有りかも)

// return cloned routes.
export const getRoutes = () => Object.assign({}, routes);

const routerCreator = (store) => {
  const {dispatch, getState} = store;
  const state = getState();

  // initialize routes.
  routes = {};

  // call on Route enter.
  const onEnter = (path, handler) => {
    routes[path] = routes[path] || {};
    routes[path] = {
      ...routes[path],
      onEnter: handler
    };

    const currentPath = getCurrent(state);
    if (currentPath === path) {
      // if handler accepts callback.
      if (handler.length == 2) {
        handler({dispatch, state}, (data = true) => {
          dispatch(initialRouteResolved());
          // if called with falsy data(includes Error)
          if (!data || data instanceof Error) {
            dispatch(routeError(data));
          }
        });
      } else {
        handler({dispatch, state});
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
    onLeave,
    destroy
  }
};

export default routerCreator;
