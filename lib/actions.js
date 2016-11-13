// actionTypes
export const REQUEST_LOCATION_CHANGE = '@@router-redux/REQUEST_LOCATION_CHANGE';
export const LOCATION_CHANGE = '@@router-redux/LOCATION_CHANGE';
export const LOCATION_CHANGE_FAILURE = '@@router-redux/LOCATION_CHANGE_FAILURE';

export const push = (pathname) => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'push',
      pathname
    }
  }
};

// export const replace = (pathname) => {
//   return {
//     type: REPLACE,
//     payload: pathname
//   }
// };
//
// export const go = (point) => {
//   return {
//     type: GO,
//     payload: point
//   }
// };
//
// export const back = () => {
//   return {
//     type: BACK
//   }
// };
//
// export const forward = () => {
//   return {
//     type: FORWARD
//   }
// };
