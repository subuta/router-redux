import React from 'react'
import {router} from 'example/store.js';

import {
  inject
} from 'example/store.js'

import {
  getIsLoading,
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

// FIXME: isLoading=trueのときにrenderが呼ばれない
export default inject(({state}) => {
  const isLoading = getIsLoading(state);
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return <h1>top</h1>;
});
