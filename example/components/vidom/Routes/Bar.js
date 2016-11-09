import { node } from 'vidom';

export default () => {
  return node('h1').children('bar');
};
