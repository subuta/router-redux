import middleware from './middleware.js';
import reducer from './reducer.js';
import * as actions from './actions.js';

export const routerMiddleware = middleware;
export const routerReducer = reducer;
export const push = actions.push;

export default (store) => {
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

  // change url and call dispatch with action
  const routeTo = (url) => {
    history.pushState(null, null, url);
  };

  const onChange = (e) => {
    // e.state is equal to the data-attribute of the last image we clicked
    const currentPath = location.pathname;
    routes[currentPath] && routes[currentPath]();
  };

  // bind onChange to popstate.
  window.addEventListener('popstate', onChange);
  const destroy = () => window.removeEventListener('popstate', onChange);

  return {
    route,
    routeTo,
    destroy,
    routes
  }
};
