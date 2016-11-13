export const getPathname = (location, isUseCustomHistory) => {
  if (isUseCustomHistory) {
    return location.pathname
  }
  return location.href.replace(location.origin, '').split('?')[0];
};

export const getSearch = (location) => {
  return location.search.split('?')[1] || '';
};

export default function createLocation(history) {
  let location = window.location;
  // check custom history is passed.
  const isUseCustomHistory = !!history
  if (isUseCustomHistory && history.location) {
    location = history.location
  }
  return {
    pathname: getPathname(location, isUseCustomHistory),
    search: getSearch(location)
  }
};
