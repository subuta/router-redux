// check state has routing.
export const hasRouting = (state) => {
  if (!state || !state.routing) {
    console.error('You must register router-redux\'s reducer as `routing` key.');
    return null;
  }
  return true;
};

// selectors
export const getCurrent = (state) => {
  return hasRouting(state) && state.routing.current
};

export const getLast = (state) => {
  return hasRouting(state) &&  state.routing.last
};

export const getNext = (state) => {
  return hasRouting(state) &&  state.routing.next
};

export const getRouteError = (state) => {
  return hasRouting(state) &&  state.routing.routeError
};

export const getIsInitalRouteResolved = (state) => {
  return hasRouting(state) &&  state.routing.isInitialRouteResolved
};
