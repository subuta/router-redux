import * as actions from './actions.js';

import {
  getCurrent,
  getLast,
  getNext,
} from './selector.js';

import match from './match.js';
import createHistory from './history.js';

import {
  stringifyLocation
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

// check and handle locationChangeFailure
export const createLocationChangeFailureHandler = (store) => (data) => {
  const { dispatch, getState } = store;
  const routes = getRoutes();

  // if called with falsy data(includes Error)
  if (!data || data instanceof Error) {
    dispatch(actions.locationChangeFailure(data));

    if (routes.Error) {
      // call error handler.
      routes.Error({ dispatch, state: getState() });
    } else {
      // put some messages with no onError handler.
      console.warn('You should register router.onError to handle this routing error. data =', data);
    }
    return true;
  }

  return false;
};

export const createRouterAction = (store) => {
  const { dispatch, getState } = store;
  const locationChangeFailureHandler = createLocationChangeFailureHandler(store);
  // routerAction
  return (action) => function routerAction () {
    dispatch(actions[ action ].apply(this, arguments))
    // onLeave
    const current = getCurrent(getState());
    const currentRoute = current && routes[ current.route ];
    // call onLeave hook
    if (currentRoute && currentRoute.onLeave) {
      currentRoute.onLeave({dispatch, state: getState()});
    }

    // onEnter
    const next = getNext(getState());
    const nextRoute = next && routes[ next.route ];

    // call onEnter hook
    if (nextRoute && nextRoute.onEnter) {
      // if onEnter accepts callback.
      if (nextRoute.onEnter.length == 2) {
        nextRoute.onEnter({ dispatch, state: getState() }, (data = true) => {
          // return if locationChangeFailure exists.
          if (locationChangeFailureHandler(data)) return;
          dispatch(actions.locationChange(stringifyLocation(next)));
        });
        return;
      } else {
        nextRoute.onEnter({ dispatch, state: getState() });
      }
    }
    next && dispatch(actions.locationChange(stringifyLocation(next)));
  }
}

// router
export default (store, option = {}) => {
  const { dispatch, getState, subscribe } = store;
  // initialize routes.
  routes = {};
  // initialize history.
  history = createHistory(option.history);
  // initialize routerAction.
  const routerAction = createRouterAction(store);

  // call on Route enter.
  const onError = (fn) => {
    routes.Error = fn;
  };

  // bind route to pathname.
  const on = (pathname, route) => {
    // arrow pass render function directly.
    if (typeof route === 'function') {
      route = { render: route }
    }
    routes[ pathname ] = Object.assign({}, route);

    // set current on initial render
    const location = history.getLocation();
    if (location.pathname === pathname) {
      dispatch(actions.locationChange(stringifyLocation(location)))
    }
  }

  // render
  const render = () => {
    const current = getCurrent(getState());
    const currentRoute = current && routes[ current.route ];
    return currentRoute ? currentRoute.render() : null;
  }

  const pop = routerAction('pop');

  // handle store.update(for redux time travel)
  // use currentLocation if last state is not defined.
  let last = getLast(getState()) ? getLast(getState()) : history.getLocation();
  let ignoreActions = false;

  const unsubscribe = subscribe(() => {
    let current = getCurrent(getState());

    if (ignoreActions) return;
    if (!current) {
      // when time travel starts.
      current = last;
    } else if (stringifyLocation(last) === stringifyLocation(current)) {
       return;
    }

    last = current;
    history.push(stringifyLocation(current));
  });

  const unlisten = history.listen((e) => {
    const current = history.getLocation();
    if (stringifyLocation(last) === stringifyLocation(current)) return true;

    // set ignoreActions for store subscriber.
    ignoreActions = true;
    last = current;
    pop(stringifyLocation(current), false);
    ignoreActions = false;
  });

  // destroy instance.
  const destroy = () => {
    unsubscribe();
    unlisten();
  }

  return {
    on,
    onError,
    render,
    destroy,

    // history actions.
    push: routerAction('push'),
    replace: routerAction('replace'),
    go: routerAction('go'),
    back: routerAction('back'),
    forward: routerAction('forward')
  }
}
