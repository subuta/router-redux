import h from 'snabbdom/h';

export default ({error}) => {
  console.log('in error page !');
  return h('h1', {}, `403 Forbidden. error = ${error}`);
};
