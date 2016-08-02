import h from 'snabbdom/h';
import {router} from '/example/store.js';

router.onEnter('/', (state, cb) => {
  console.log('loading ...');
  setTimeout(() => {
    console.log('enter in top');
    cb();
  }, 3000);
});

router.onLeave('/', (state) => {
  console.log('leave from top');
});

export default () => {
  return h('h1', {}, 'top');
};
