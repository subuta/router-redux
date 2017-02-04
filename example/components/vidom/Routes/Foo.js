import { node } from 'vidom';

const onEnter = ({state}) => {
  console.log('[foo]entered', state);
};

const onLeave = ({state}) => {
  console.log('[foo]leave', state);
};

const render = () => {
  return node('h1').children('foo');
};

export default {
  onEnter,
  onLeave,
  render
};
