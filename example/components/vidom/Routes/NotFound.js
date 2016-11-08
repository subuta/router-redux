import { node } from 'vidom';

export default () => {
  return node('h1').children('404 Not found.');
};
