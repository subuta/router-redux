import {
  routeChange,
  routeError,
  initialRouteResolved
} from './actions.js';

import {
  getCurrent
} from './reducer.js';

let routes = {};

// return cloned routes.
export const getRoutes = () => Object.assign({}, routes);

const routerCreator = (store) => {
  const {dispatch, getState} = store;
  const state = getState();

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

    const currentPath = getCurrent(state);
    if (currentPath === path) {
      // if handler accepts callback.
      if (handler.length == 2) {
        handler({dispatch, state}, (data = true) => {
          dispatch(initialRouteResolved());
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
    onError,
    onLeave,
    destroy
  }
};

export default routerCreator;
