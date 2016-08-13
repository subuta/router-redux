import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  routeError,
  isHistoryAction
} from './actions.js';

import {
  getRoutes
} from './router.js';

import {
  getCurrent
} from './reducer.js';

// call history api.
const callHistoryByAction = (history, action) => {
  if (action.type === PUSH) {
    history.pushState(null, null, action.payload);
  } else if (action.type === REPLACE) {
    history.replaceState(null, null, action.payload);
  } else if (action.type === GO) {
    history.go(action.payload);
  } else if (action.type === BACK) {
    history.back();
  } else if (action.type === FORWARD) {
    history.forward();
  }
  // if history action then override payload as location
  action.payload = location;
};

export default (store) => (next) => (action) => {
  // use current state
  const {dispatch, getState} = store;
  const state = getState();
  const currentPath = getCurrent(state);
  const history = window.history;

  // pass-through other action.
  if (!isHistoryAction(action.type)) {
    next(action);
    return;
  }

  // ignore push/replace to current location.
  if ((action.type === PUSH || action.type === REPLACE) && currentPath === action.payload) {
    return;
  }

  const routes = getRoutes();
  const nextPath = action.payload;

  // call onLeave hook
  if (routes[currentPath] && routes[currentPath].onLeave) {
    routes[currentPath].onLeave(state);
  }

  // call onEnter hook
  if (routes[nextPath] && routes[nextPath].onEnter) {
    // if onEnter accepts callback.
    if (routes[nextPath].onEnter.length == 2) {
      routes[nextPath].onEnter({dispatch, state}, (data = true) => {
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
          return; // stop history action.
        }

        // delay action dispatch until onEnter finished.
        callHistoryByAction(history, action);
        next(action);
      });
      return;
    } else {
      routes[nextPath].onEnter({dispatch, state});
    }
  }

  // if onEnter not specified.
  callHistoryByAction(history, action);
  next(action);
};
