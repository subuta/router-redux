import React from 'react'

const onEnter = ({state}) => {
  console.log('[foo]entered', state);
};

const onLeave = ({state}) => {
  console.log('[foo]leave', state);
};

const render = () => {
  return <h1>foo</h1>;
};

export default {
  render,
  onEnter,
  onLeave
};
