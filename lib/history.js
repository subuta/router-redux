// wrap browser history to simulate history api for consistency https://github.com/mjackson/history
export const push = (history) => (to) => {
  history.push ? history.push(to) : history.pushState(null, null, to);
};

export const replace = (history) => (to) => {
  history.replace ? history.replace(to) : history.replaceState(null, null, to);
};

export const listen = (history) => (fn) => {
  if (history.listen) return history.listen(fn)
  // bind onChange to popstate.
  window.addEventListener('popstate', fn);
  return () => window.removeEventListener('popstate', fn);
};

export const getLocation = (history, isUseCustomHistory) => () => {
  return isUseCustomHistory ? history.location : window.location
};

export default (history) => {
  // check custom history is passed.
  const isUseCustomHistory = !!history
  if (!isUseCustomHistory) {
    history = window.history
  }
  return {
    ...history,
    location,
    push: push(history),
    replace: replace(history),
    listen: listen(history),
    getLocation: getLocation(history, isUseCustomHistory)
  };
};
