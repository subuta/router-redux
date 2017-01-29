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
let ignoreHistory = false;

// return cloned routes.
export const getRoutes = () => Object.assign({}, routes);
export const getHistory = () => history;
export const getIgnoreHistory = () => ignoreHistory;

export const findRouteKeyByPath = (path) => {
  const routes = Object.keys(getRoutes());
  for (let i = 0; i < routes.length; i++) {
    const key = routes[ i ];
    if (key !== '*' && match(key, path)) return key; // return matched route.
  }
  return null; // not found
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
export const locationChangeFailure = (store, data) => {
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

export const routeLeave = (store) => {
  const { dispatch, getState } = store;
  const current = getCurrent(getState());
  const currentRoute = current && routes[ current.route ];
  // call onLeave hook
  if (currentRoute && currentRoute.onLeave) {
    currentRoute.onLeave({dispatch, state: getState()});
  }
};

export const routeEnter = (store, cb = () => {}) => {
  const { dispatch, getState } = store;
  const next = getNext(getState());
  const nextRoute = next && routes[ next.route ];

  // call onEnter hook
  if (nextRoute && nextRoute.onEnter) {
    // if onEnter accepts callback.
    if (nextRoute.onEnter.length == 2) {
      nextRoute.onEnter({ dispatch, state: getState() }, (data = true) => {
        // return if locationChangeFailure exists.
        if (locationChangeFailure(store, data)) return;
        dispatch(actions.locationChange(stringifyLocation(next)));
        return;
      });
    } else if (nextRoute.onEnter) {
      dispatch(actions.locationChange(stringifyLocation(next)));
      nextRoute.onEnter({ dispatch, state: getState() });
    }
  } else if (nextRoute && !nextRoute.onEnter) {
    // onEnterが未定義の場合
    dispatch(actions.locationChange(stringifyLocation(next)));
  }
};

export const createRouterAction = (store) => {
  const { dispatch } = store;
  // routerAction
  return (action) => function routerAction () {
    dispatch(actions[ action ].apply(this, arguments))

    // onLeave
    routeLeave(store);

    // onEnter
    routeEnter(store);
  }
};

// router
export default (store, option = {}) => {
  const { dispatch, getState, subscribe } = store;
  // initialize routes.
  routes = {};
  // initialize history.
  history = createHistory(option.history);
  // initialize ignoreHistory.
  ignoreHistory = false;
  // initialize routerAction.
  const routerAction = createRouterAction(store);

  const pop = routerAction('pop');
  const push = routerAction('push');

  // call on Route enter.
  const onError = (fn) => {
    routes.Error = fn;
  };

  // bind route to pathname.
  const on = (pathname, route) => {
    let nextRoute;

    // allow pass render function directly.
    if (typeof route === 'function') {
      nextRoute = { render: route }
    } else if (route.onEnter || route.onLeave || route.render) {
      // allow register object.
      nextRoute = Object.assign({}, route);
    } else {
      // allow register jsx.
      nextRoute = { ...route.props, render: () => route }
    }
    routes[ pathname ] = nextRoute;

    // set current on initial render
    const location = history.getLocation();
    if (pathname !== '*' && match(pathname, location.pathname)) {
      if (nextRoute.onEnter) {
        push(stringifyLocation(location))
        return;
      }
      dispatch(actions.locationChange(stringifyLocation(location)))
    }
  }

  // render
  const render = () => {
    const current = getCurrent(getState());
    let currentRoute = current && routes[ current.route ];
    if (!currentRoute && routes['*']) {
      currentRoute = routes['*'];
    }
    return currentRoute ? currentRoute.render() : null;
  }

  // handle store.update(for redux time travel)
  // use currentLocation if last state is not defined.
  let last = getLast(getState()) ? getLast(getState()) : history.getLocation();

  const unsubscribe = subscribe(() => {
    let current = getCurrent(getState());

    if (ignoreHistory) return;
    if (!current) {
      // when time travel starts.
      current = last;
    } else if (stringifyLocation(last) === stringifyLocation(current)) {
       return;
    }

    last = current;

    // prevent push to same path.
    const location = history.getLocation();
    if (location.pathname === current.pathname) return;

    history.push(stringifyLocation(current));
  });

  const unlisten = history.listen((e) => {
    const current = history.getLocation();
    if (stringifyLocation(last) === stringifyLocation(current)) return true;

    // set ignoreHistory for store subscriber.
    ignoreHistory = true;
    last = current;
    pop(stringifyLocation(current));
    ignoreHistory = false;
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
    push: push,
    replace: routerAction('replace'),
    go: routerAction('go'),
    back: routerAction('back'),
    forward: routerAction('forward')
  }
}
