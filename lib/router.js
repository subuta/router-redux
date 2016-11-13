import match from './match.js';

// keep routes outside of the function to access from middleware.
let routes = {};

// return cloned routes.
export const getRoutes = () => Object.assign({}, routes);

export const findRouteKeyByPath = (path) => {
  const routes = Object.keys(getRoutes());
  for (let i = 0; i < routes.length; i++) {
    const key = routes[ i ];
    if (match(key, path)) return key; // return matched route.
  }
  return null; // return null if not found
};

// router
export default (store) => {
  const { dispatch, getState } = store;
  // initialize routes.
  routes = {};

  const on = (path, route) => {
    // arrow pass render function directly.
    if (typeof route === 'function') {
      route = { render: route }
    }
    routes[ path ] = Object.assign({}, route);
  }

  const render = () => {
    const {path} = getState().current
    const key = findRouteKeyByPath(path);
    const currentRoute = routes[ key ];
    return currentRoute && currentRoute.render();
  }

  return {
    on,
    render
  }
}
