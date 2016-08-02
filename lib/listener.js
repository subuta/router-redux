import {routeChange} from './actions.js';

const listenerCreator = (store) => {
  const {dispatch, getState} = store;
  let routes = {};

  // // call on Route enter.
  // const onEnter = (path, handler) => {
  //   routes[path] = routes[path] || {};
  //   routes[path] = {
  //     ...routes[path],
  //     onEnter: handler
  //   };
  // };
  //
  // // call on Route leave.
  // const onLeave = (pathname, handler) => {
  //   routes[pathname] = routes[pathname] || {};
  //   routes[pathname] = {
  //     ...routes[pathname],
  //     onLeave: handler
  //   };
  // };

  const onChange = (e) => {
    // if (routes[lastPath] && routes[lastPath].onLeave) {
    //   console.log('leave.');
    //   routes[lastPath].onLeave();
    // }

    console.log('change route!');
    dispatch(routeChange(location));

    // if (routes[current] && routes[current].onEnter) {
    //   console.log('enter.');
    //   routes[current].onEnter();
    // }
  };

  // bind onChange to popstate.
  window.addEventListener('popstate', onChange);
  const destroy = () => window.removeEventListener('popstate', onChange);

  return {
    // onEnter,
    // onLeave,
    destroy
  }
};

export default listenerCreator;
