// actionTypes
export const ROUTE_CHANGE = '@@router-redux/ROUTE_CHANGE';
export const SET_NEXT_ROUTE = '@@router-redux/SET_NEXT_ROUTE';
export const INITIAL_ROUTE_RESOLVED = '@@router-redux/INITIAL_ROUTE_RESOLVED';
export const ROUTE_ERROR = '@@router-redux/ROUTE_ERROR';
export const PUSH = '@@router-redux/HISTORY_PUSH_STATE';
export const REPLACE = '@@router-redux/HISTORY_REPLACE_STATE';
export const GO = '@@router-redux/HISTORY_GO';
export const BACK = '@@router-redux/HISTORY_BACK';
export const FORWARD = '@@router-redux/HISTORY_FORWARD';

export const isHistoryAction = (str) => !!str && str.indexOf("@@router-redux/HISTORY") === 0;
export const isRouteAction = (str) => !!str && str.indexOf("@@router-redux/ROUTE") === 0;

export const transformLocationToPath = (location) => {
  const fullPath = location.href.replace(location.origin, '');
  return fullPath.split('?')[0]; // ignore query string completely.
};

export const getQuery = (location) => {
  const fullPath = location.href.replace(location.origin, '');
  return fullPath.split('?')[1] ? fullPath.split('?')[1] : ''; // return query only.
};

export const setNextRoute = (route) => {
  return {
    type: SET_NEXT_ROUTE,
    payload: route
  }
};

export const routeChange = (route) => {
  return {
    type: ROUTE_CHANGE,
    payload: route
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
