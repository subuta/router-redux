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
  const currentPath = getCurrent(state).path;
  const routeError = getRouteError(state);

  if (currentPath === '/error') {
    return Error({error: routeError.message});
  } else if (currentPath === '/') {
    return Top();
  } else if (currentPath === '/foo') {
    return Foo();
  } else if (currentPath === '/bar') {
    return Bar();
  } else {
    return NotFound();
  }
});
