import {routeChange} from './actions.js';

let routes = {};

// borrowed from https://github.com/substack/deep-freeze
  const deepFreeze = (o) => {
    // create clone from original.
    o = Object.assign({}, o);
    Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach(function (prop) {
      if (o.hasOwnProperty(prop)
        && o[prop] !== null
        && (typeof o[prop] === "object" || typeof o[prop] === "function")
        && !Object.isFrozen(o[prop])) {
        deepFreeze(o[prop]);
      }
    });

    return o;
  };

// return cloned immutable routes.
  export const getRoutes = () => deepFreeze(routes);

  const routerCreator = (store) => {
    const {dispatch, getState} = store;

    // initialize routes.
    routes = {};

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
