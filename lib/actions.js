// actionTypes
export const REQUEST_LOCATION_CHANGE = '@@router-redux/REQUEST_LOCATION_CHANGE';
export const LOCATION_CHANGE = '@@router-redux/LOCATION_CHANGE';
export const LOCATION_CHANGE_FAILURE = '@@router-redux/LOCATION_CHANGE_FAILURE';

export const locationChange = (pathname, via = 'push') => {
  return {
    type: LOCATION_CHANGE,
    payload: {
      via,
      pathname
    }
  }
};

export const locationChangeFailure = (error) => {
  return {
    type: LOCATION_CHANGE_FAILURE,
    payload: error
  }
};

export const push = (pathname) => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'push',
      pathname
    }
  }
};

export const pop = (pathname) => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'pop',
      pathname
    }
  }
};

export const replace = (pathname) => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'replace',
      pathname
    }
  }
};


export const go = (point) => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'go',
      point
    }
  }
};

export const back = () => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'back'
    }
  }
};

export const forward = () => {
  return {
    type: REQUEST_LOCATION_CHANGE,
    payload: {
      via: 'forward'
    }
  }
};
