import {
  RESET,
  ROUTE_CHANGE,
  INITIAL_ROUTE_RESOLVED,
  ROUTE_ERROR,
  SET_NEXT_ROUTE,
  isHistoryAction
} from "./actions.js";

import {
  createRoute,
  getHistory
} from './router.js';

import locationCreator from './location.js';

const getInitialState = () => {
  const history = getHistory();
  const location = locationCreator(history);
  // defaults to raw location.
  return {
    current: createRoute(location.pathname, location.search),
    last: null,
    next: null,
    isInitialRouteResolved: false,
    routeError: false
  }
}

const reducer = (state = getInitialState(), action) => {
  if (action.type === ROUTE_CHANGE ||
    isHistoryAction(action.type)) {
    return {
      ...state,
      current: action.payload,
      next: null,
      routeError: null,
      last: state.current
    };
  } else if (action.type === ROUTE_ERROR) {
    return {
      ...state,
      next: null,
      routeError: action.payload
    };
  } else if (action.type === SET_NEXT_ROUTE) {
    return {...state, next: action.payload};
  } else if (action.type === INITIAL_ROUTE_RESOLVED) {
    return {...state, isInitialRouteResolved: true};
  }
  return state
}

// reset hoc
const canReset = (reducer) => (state, action) => {
  if (action.type === RESET) {
    state = getInitialState()
  }
  return reducer(state, action)
}

// reducer
export default canReset(reducer);
