import {
  ROUTE_CHANGE,
  INITIAL_ROUTE_RESOLVED,
  ROUTE_ERROR,
  isHistoryAction,
  transformToPath
} from "./actions.js";

// defaults to raw location.
const initialState = {
  current: transformToPath(location),
  last: null,
  isInitialRouteResolved: false,
  routeError: false
};

// reducer
export default (state = initialState, action) => {
  if (action.type === ROUTE_CHANGE ||
      isHistoryAction(action.type)) {
    return {...state, current: action.payload, last: state.current};
  } else if (action.type === ROUTE_ERROR) {
    return {...state, routeError: action.payload};
  } else if (action.type === INITIAL_ROUTE_RESOLVED) {
    return {...state, isInitialRouteResolved: true};
  }
  return state
};

// check state has routing.
export const hasRouting = (state) => {
  if (!state || !state.routing) {
    console.error('You must register router-redux\'s reducer as `routing` key.');
    return null;
  }
  return true;
};

// selectors
export const getCurrent = (state) => {
  return hasRouting(state) && state.routing.current
};

export const getLast = (state) => {
  return hasRouting(state) &&  state.routing.last
};

export const getRouteError = (state) => {
  return hasRouting(state) &&  state.routing.routeError
};

export const getIsInitalRouteResolved = (state) => {
  return hasRouting(state) &&  state.routing.isInitialRouteResolved
};
