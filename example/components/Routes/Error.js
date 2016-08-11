import h from 'snabbdom/h';

export default ({error}) => {
  return h('h1', {}, `403 Forbidden. error = ${error}`);
};
