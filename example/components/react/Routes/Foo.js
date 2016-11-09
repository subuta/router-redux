import React from 'react'
import {router} from 'example/store.js';

router.onEnter('/foo/:id', ({state}) => {
  console.log('[foo]entered', state);
});

router.onLeave('/foo/:id', ({state}) => {
  console.log('[foo]leave', state);
});

export default () => {
  return <h1>foo</h1>;
};
