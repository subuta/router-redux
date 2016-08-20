import {
  ROUTE_CHANGE,
  INITIAL_ROUTE_RESOLVED,
  ROUTE_ERROR,
  SET_NEXT_ROUTE,
  transformLocationToPath,
  isHistoryAction
} from "./actions.js";

import {
  createRoute
} from './router.js';

// defaults to raw location.
const initialState = {
  current: null,
  last: null,
  next: null,
  isInitialRouteResolved: false,
  routeError: false
};

// reducer
export default (state = initialState, action) => {
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
