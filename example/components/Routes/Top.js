import h from 'snabbdom/h';
import {router} from 'example/store.js';

import {
  inject
} from 'example/store.js'

import {
  getIsInitalRouteResolved
} from 'lib/index.js';

router.onEnter('/', ({state}, cb) => {
  console.log('loading ...');
  setTimeout(() => {
    console.log('enter in top');
    cb(new Error('some error in top'));
    // cb();
  }, 3000);
});

router.onLeave('/', (state) => {
  console.log('leave from top');
});

export default inject(({state}) => {
  const isInitialRouteResolved = getIsInitalRouteResolved(state);
  if (!isInitialRouteResolved) {
    return h('h1', {}, 'loading...');
  }
  return h('h1', {}, 'top');
});
