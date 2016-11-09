import {
  inject
} from 'example/store.js'

import {
  getCurrent,
  match
} from 'router-redux';

import Top from './Top.js';
import Bar from './Bar.js';
import Foo from './Foo.js';
import NotFound from './NotFound.js';
import Error from './Error.js';

export default inject(({state}) => {
  const currentPath = getCurrent(state) && getCurrent(state).path;
  if (match('/error', currentPath)) {
    return Error({error: 'some error occurred'});
  } else if (match('/', currentPath)) {
    return Top();
  } else if (match('/foo/:id', currentPath)) {
    return Foo();
  } else if (match('/bar', currentPath)) {
    return Bar();
  } else {
    return NotFound();
  }
});
