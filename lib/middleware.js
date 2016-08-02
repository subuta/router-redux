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

export default (history = window.history) => {
  return (store) => (next) => (action) => {
    if ((action.type === PUSH || action.type === REPLACE) && location.pathname === action.payload) {
      return; // ignore push/replace to current location.
    }

    // handle action
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
    if (isHistoryAction(action.type)) {
      action.payload = location;
    }

    return next(action);
  }
}
