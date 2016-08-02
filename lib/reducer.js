import {
  ROUTE_CHANGE,
  isHistoryAction
} from "./actions.js";

export const transformToPath = (location) => {
  return location.href.replace(location.origin, '')
};

// defaults to raw location.
const initialState = {
  current: transformToPath(location),
  last: null
};

// reducer
export default (state = initialState, action) => {
  if (action.type === ROUTE_CHANGE || isHistoryAction(action.type)) {
    return {current: transformToPath(action.payload), last: state.current};
  }
  return state
};

// check state has routing.
const hasRouting = (state) => {
  if (!state.routing) {
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

export const isEnter = (state, pathname) => {
  return !!hasRouting(state) && !!getCurrent(state) && getCurrent(state).indexOf(pathname) === 0
};

export const isLeave = (state, pathname) => {
  return !!hasRouting(state) && !!getLast(state) && getLast(state).indexOf(pathname) === 0
};
