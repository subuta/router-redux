import {
  // REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE
  // LOCATION_CHANGE_FAILURE
} from 'lib/actions.js';

const onLocationChange = (next, action) => {
  return next(action)
};

export default store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    return onLocationChange(next, action)
  } else {
    return next(action)
  }
};
