// actionTypes
export const ROUTE_CHANGE = '@@router-redux/ROUTE_CHANGE';
export const PUSH_STATE = '@@router-redux/PUSH_STATE';

export const push = (url) => {
  return {
    type: PUSH_STATE,
    payload: url
  }
};

// // actions
// function updateLocation(method) {
//   return (...args) => ({
//     type: CALL_HISTORY,
//     payload: { method, args }
//   })
// }
//
// /**
//  * These actions correspond to the history API.
//  * The associated routerMiddleware will capture these events before they get to
//  * your reducer and reissue them as the matching function on your history.
//  */
// export const push = updateLocation('push')
// export const replace = updateLocation('replace')
// export const go = updateLocation('go')
// export const goBack = updateLocation('goBack')
// export const goForward = updateLocation('goForward')
//
// export const routerActions = { push, replace, go, goBack, goForward }
