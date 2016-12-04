import {
  REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE
  // LOCATION_CHANGE_FAILURE
} from 'lib/actions.js';

import {
  parseLocation
} from 'lib/location.js';

import {
  getHistory,
  enrichLocation
} from 'lib/router.js';

const onLocationChange = (next, action) => {
  const {via, pathname} = action.payload;
  const history = getHistory();
  let nextAction = {type: LOCATION_CHANGE}

  if (via === 'push') {
    history.push(pathname)
  } else if (via === 'replace') {
    history.replace(pathname)
  }

  nextAction.payload = enrichLocation(history.getLocation())
  return next(nextAction);
};

export default store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    return onLocationChange(next, action)
  } else if (action.type === REQUEST_LOCATION_CHANGE) {
    const {pathname} = action.payload;
    action.payload = enrichLocation(parseLocation(pathname));
    return next(action)
  } else {
    return next(action)
  }
};
