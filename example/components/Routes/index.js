import {
  inject
} from 'example/store.js'

import {
  getCurrent,
  getRouteError
} from 'lib/index.js';

import Top from './Top.js';
import Bar from './Bar.js';
import Foo from './Foo.js';
import NotFound from './NotFound.js';
import Error from './Error.js';

export default inject(({state}) => {
  const current = getCurrent(state);
  const routeError = getRouteError(state);

  if (current === '/error') {
    return Error({error: routeError.message});
  } else if (current === '/') {
    return Top();
  } else if (current === '/foo') {
    return Foo();
  } else if (current === '/bar') {
    return Bar();
  } else {
    return NotFound();
  }
});
