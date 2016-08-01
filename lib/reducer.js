import {
  ROUTE_CHANGE
} from "lib/actions.js";

// reducer
export default (state = {}, action) => {
  if (action.type === ROUTE_CHANGE) {
    console.log('ROUTE_CHANGE!');
    return state;
  }
  return state
};
