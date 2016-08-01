import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD
} from './actions.js';

import {
  isHistoryAction
} from './reducer.js';

export default (history = window.history) => {
  return (store) => (next) => (action) => {
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
