import h from 'snabbdom/h';
import {router} from 'example/store.js';

import {
  getRouteError
} from 'router-redux';

router.onError(({state}) => {
  const routeError = getRouteError(state);
  console.log('routeError.message = ', routeError.message);
  router.push('/error');
});

export const onEnter = ({state}, cb) => {
  console.log('[top]loading ...', state);
  setTimeout(() => {
    console.log('[top]timer fired');
    // cb(new Error('[top]thrown error'));
    cb();
  }, 1000);
};

export const onLeave = ({state}) => {
  console.log('[top]leave');
};

export default () => {
  return h('h1', {}, 'top');
}
