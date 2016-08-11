import {
  inject
} from 'example/store.js'

import {
  getCurrent,
  getIsInitalRouteResolved
} from 'lib/index.js';

import Top from './Top.js';
import Bar from './Bar.js';
import Foo from './Foo.js';
import NotFound from './NotFound.js';

export default inject(({state}) => {
  const current = getCurrent(state);
  if (current === '/') {
    return Top();
  } else if (current === '/foo') {
    return Foo();
  } else if (current === '/bar') {
    return Bar();
  } else {
    return NotFound();
  }
});
