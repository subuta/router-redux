import { node } from 'vidom';
import {router} from 'example/store.js';

router.onEnter('/foo/:id', ({state}) => {
  console.log('[foo]entered', state);
});

router.onLeave('/foo/:id', ({state}) => {
  console.log('[foo]leave', state);
});

export default () => {
  return node('h1').children('foo');
};
