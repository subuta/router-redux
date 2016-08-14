export const pathToRegex = (path) => {
  path = path.replace('/', '\/')
    .replace(/(:+[^/?]*)/g, '([^\/?]*\/?)'); // replace every occurance
  return new RegExp(path);
};

const match = (path, anotherPath) => {
  return anotherPath.match(pathToRegex(path));
};

export default match;

