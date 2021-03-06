import {
  REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE
} from 'lib/actions.js';

import {
  parseLocation
} from 'lib/location.js';

import {
  getHistory,
  getIgnoreHistory,
  enrichLocation
} from 'lib/router.js';

const onLocationChange = (next, action) => {
  const {via, pathname} = action.payload;
  const history = getHistory();
  const ignoreHistory = getIgnoreHistory();

  let nextAction = {type: LOCATION_CHANGE}

  if (!ignoreHistory) {
    if (via === 'push') {
      const location = history.getLocation();
      // if path is changed then push history.
      if (location.pathname !== pathname) {
        history.push(pathname)
      }
    } else if (via === 'replace') {
      history.replace(pathname)
    }
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
