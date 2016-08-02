import h from 'snabbdom/h';

import {
  inject
} from 'example/store.js'

import {
  getCurrent,
  getLast,
  isEnter,
  isLeave
} from '/lib/index.js';

export default inject(({state}) => {
  const current = getCurrent(state);
  const last = getLast(state);
  const _isEnter = isEnter(state, '/test');
  const _isLeave = isLeave(state, '/test');
  console.log("current = ", current);
  console.log("last = ", last);
  console.log("isEnter to test = ", _isEnter);
  console.log("_isLeave from test = ", _isLeave);
  if (current === '/') {
    return h('h1', {}, 'top');
  } else if (current === '/test') {
    return h('h1', {}, 'test');
  } else if (current === '/foo') {
    return h('h1', {}, 'bar');
  }
});
