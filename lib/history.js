import createLocation from './location.js';

// wrap browser history to simulate history api for consistency https://github.com/mjackson/history
export const push = (history) => (to) => {
  history.push ? history.push(to) : history.pushState(null, null, to);
};

export const replace = (history) => (to) => {
  history.replace ? history.replace(to) : history.replaceState(null, null, to);
};

export const listen = (history) => (fn) => {
  if (history.listen) return history.listen(fn);
  // simulate history API.
  const listener = () => fn(null, 'POP');
  // bind onChange to popstate.
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
};

export default function createHistory(history) {
  // check custom history is passed.
  const isUseCustomHistory = !!history
  if (!isUseCustomHistory) {
    history = window.history
  }

  return {
    go: history.go,
    back: history.back,
    forward: history.forward,
    push: push(history),
    replace: replace(history),
    listen: listen(history),
    getLocation: () => createLocation(history),
    // extra properties.
    isPolyfill: true
  };
};
