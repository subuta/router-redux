import {
  ROUTE_CHANGE,
  INITIAL_ROUTE_RESOLVED,
  ROUTE_ERROR,
  SET_NEXT_ROUTE,
  isHistoryAction,
  transformLocationToPath,
  getQuery
} from "./actions.js";

import {
  createRoute,
  getHistory
} from './router.js';

const getInitialState = () => {
  const history = getHistory();
  const location = history.getLocation()
  // defaults to raw location.
  return {
    current: createRoute(location.pathname, location.search),
    last: null,
    next: null,
    isInitialRouteResolved: false,
    routeError: false
  }
}

// reducer
export default (state = getInitialState(), action) => {
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
};
