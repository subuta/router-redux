import { node } from 'vidom';
import {router} from 'example/store.js';

import {
  inject
} from 'example/store.js'

import {
  push,
  getIsInitalRouteResolved,
  getRouteError
} from 'router-redux';

router.onError(({state, dispatch}) => {
  const routeError = getRouteError(state);
  console.log('routeError.message = ', routeError.message);
  dispatch(push('/error'));
});

router.onEnter('/', ({state}, cb) => {
  console.log('[top]loading ...', state);
  setTimeout(() => {
    console.log('[top]timer fired');
    // cb(new Error('[top]thrown error'));
    cb();
  }, 1000);
});

router.onLeave('/', ({state}) => {
  console.log('[top]leave');
});

export default inject(({state}) => {
  const isInitialRouteResolved = getIsInitalRouteResolved(state);
  if (!isInitialRouteResolved) {
    return node('h1').children('loading...');
  }
  return node('h1').children('top');
});
