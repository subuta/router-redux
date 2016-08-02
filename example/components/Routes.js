import h from 'snabbdom/h';

import {
  inject
} from 'example/store.js'

import {
  getCurrent
} from '/lib/index.js';

export default inject(({state}) => {
  const current = getCurrent(state);
  console.log("current = ", current);
  if (current === '/') {
    return h('h1', {}, 'top');
  } else if (current === '/test') {
    return h('h1', {}, 'test');
  } else if (current === '/foo') {
    return h('h1', {}, 'bar');
  } else {
    return h('h1', {}, 'not found...');
  }
});
