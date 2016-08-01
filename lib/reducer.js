import {
  ROUTE_CHANGE
} from "lib/actions.js";

// defaults to raw location.
const initialState = {
  current: location
};

export const isHistoryAction = (str) => str.indexOf("@@router-redux/HISTORY") === 0;

// reducer
export default (state = initialState, action) => {
  if (action.type === ROUTE_CHANGE || isHistoryAction(action.type)) {
    return {...state, current: action.payload};
  }
  return state
};
