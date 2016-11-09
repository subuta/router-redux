import React from 'react'
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
    return <h1>loading...</h1>;
  }
  return <h1>top</h1>;
});
