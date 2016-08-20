import h from 'snabbdom/h';
import {router} from 'example/store.js';

router.onEnter('/foo/:id', ({state}) => {
  console.log('in foo.', state);
});

export default () => {
  return h('h1', {}, 'foo');
};
