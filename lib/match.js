const pattern = /(:+[^/?]*)/g;

export const pathToRegex = (path) => {
  path = path.replace('/', '\/')
    .replace(pattern, '([^\/?]*\/?)'); // replace every occurrence
  return new RegExp(`^${path}$`);
};

const match = (path, anotherPath) => {
  if (!path || !anotherPath) return null;
  anotherPath = anotherPath.replace(/(\?.*$)/, '');
  anotherPath = anotherPath.replace(/(#+.*$)/, '');
  const matched = anotherPath.match(pathToRegex(path));

  if (matched && path.match(pattern)) {
    const result = {};
    path.match(pattern).forEach((p, i) => {
      if (!matched[i + 1]) return null; // if not matched then return
      p = p.replace(':', ''); // remove leading colon.
      result[p] = isNaN(matched[i + 1]) ? matched[i + 1] : Number(matched[i + 1]);
    });
    // return false if result is empty.
    return Object.keys(result).length ? result : null;
  }

  return matched ? {} : null;
};

export default match;
