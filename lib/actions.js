// actionTypes
export const ROUTE_CHANGE = '@@router-redux/ROUTE_CHANGE';
export const INITIAL_ROUTE_RESOLVED = '@@router-redux/INITIAL_ROUTE_RESOLVED';
export const ROUTE_ERROR = '@@router-redux/ROUTE_ERROR';
export const PUSH = '@@router-redux/HISTORY_PUSH_STATE';
export const REPLACE = '@@router-redux/HISTORY_REPLACE_STATE';
export const GO = '@@router-redux/HISTORY_GO';
export const BACK = '@@router-redux/HISTORY_BACK';
export const FORWARD = '@@router-redux/HISTORY_FORWARD';

export const isHistoryAction = (str) => !!str && str.indexOf("@@router-redux/HISTORY") === 0;

export const routeChange = (path) => {
  return {
    type: ROUTE_CHANGE,
    payload: path
  }
};

export const routeError = (err) => {
  return {
    type: ROUTE_ERROR,
    payload: !err ? true : err // convert falsy value to true for convenience.
  }
};

export const initialRouteResolved = () => {
  return {
    type: INITIAL_ROUTE_RESOLVED
  }
};

export const push = (pathname) => {
  return {
    type: PUSH,
    payload: pathname
  }
};

export const replace = (pathname) => {
  return {
    type: REPLACE,
    payload: pathname
  }
};

export const go = (point) => {
  return {
    type: GO,
    payload: point
  }
};

export const back = () => {
  return {
    type: BACK
  }
};

export const forward = () => {
  return {
    type: FORWARD
  }
};
