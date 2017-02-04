import { node } from 'vidom';

export default ({error}) => {
  return node('h1').children(`403 Forbidden. error = 'some error occured'`)
};
