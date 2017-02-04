import {
  REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE,
  LOCATION_CHANGE_FAILURE
} from 'lib/actions.js';

// defaults to raw location.
const initialState = {
  current: null,
  last: null,
  next: null,
  routeError: null,
  isLoading: false
}

// reducer
export default (state = initialState, action) => {

  if (action.type === REQUEST_LOCATION_CHANGE) {
    return {
      ...state,
      next: action.payload,
      isLoading: true
    }
  } else if (action.type === LOCATION_CHANGE) {
    return {
      ...state,
      current: action.payload,
      last: state.current,
      next: null,
      routeError: null,
      isLoading: false
    }
  } else if (action.type === LOCATION_CHANGE_FAILURE) {
    return {
      ...state,
      next: null,
      routeError: action.payload,
      isLoading: false
    }
  }

  return state;
};
