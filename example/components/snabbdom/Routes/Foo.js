import h from 'snabbdom/h';

const onEnter = ({state}) => {
  console.log('[foo]entered', state);
};

const onLeave = ({state}) => {
  console.log('[foo]leave', state);
};

const render = () => {
  return h('h1', {}, 'foo');
};

export default {
  onEnter,
  onLeave,
  render
};
