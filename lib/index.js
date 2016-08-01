// middleware
import middlewareCreator from './middleware.js'
export const routerMiddlewareCreator = middlewareCreator;

// reducer
import reducer from './reducer.js'
export const routerReducer = reducer;

// actions
import * as actions from './actions.js';
export const {
  push,
  replace,
  go,
  back,
  forward
} = actions;

const routerCreator = (store) => {
  const {dispatch, getState} = store;
  let routes = {};

  // change url and call dispatch with action
  const route = (path, handler) => {
    // if specified path equals to current path then call handler.
    const currentPath = location.pathname;
    if (currentPath == path) {
      handler();
    }
    routes[path] = handler;
  };

  const onChange = (e) => {
    // e.state is equal to the data-attribute of the last image we clicked
    // const currentPath = location.pathname;
    // routes[currentPath] && routes[currentPath]();
    dispatch(actions.routeChange(location));
  };

  // bind onChange to popstate.
  window.addEventListener('popstate', onChange);
  const destroy = () => window.removeEventListener('popstate', onChange);

  return {
    route,
    destroy,
    routes
  }
};

export default routerCreator;
