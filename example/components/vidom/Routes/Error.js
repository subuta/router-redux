import { node } from 'vidom';

export default ({error}) => {
  console.log('in error page !');
  return node('h1').children(`403 Forbidden. error = ${error}`)
};
