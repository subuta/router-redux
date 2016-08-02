import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  isHistoryAction
} from './actions.js';

import {
  getRoutes
} from './router.js';

import {
  getCurrent
} from './reducer.js';

const callHistoryByAction = (action) => {
  if (!isHistoryAction(action.type)) return;

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

export default (history = window.history) => {
  return (store) => (next) => (action) => {
    // use current state
    const state = store.getState();
    const currentPath = getCurrent(state);

    if ((action.type === PUSH || action.type === REPLACE) && currentPath === action.payload) {
      return; // ignore push/replace to current location.
    }

    const routes = getRoutes();
    const nextPath = action.payload;

    // call onLeave hook
    if (routes[currentPath] && routes[currentPath].onLeave) {
      routes[currentPath].onLeave(state);
    }

    // call onEnter hook
    if (routes[nextPath] && routes[nextPath].onEnter) {
      routes[nextPath].onEnter(state, () => {
        callHistoryByAction(action);
        next(action);
      });
    } else {
      // if onEnter not specified.
      callHistoryByAction(action);
      next(action);
    }
  }
}
