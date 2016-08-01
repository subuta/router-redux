import h from 'snabbdom/h';

import {
  inject
} from 'example/store.js'

export default inject(({state}) => {
  const {pathname} = state.routing.current;
  if (pathname === '/') {
    return h('h1', {}, 'top');
  } else if (pathname === '/test') {
    return h('h1', {}, 'test');
  } else if (pathname === '/foo') {
    return h('h1', {}, 'bar');
  }
});
