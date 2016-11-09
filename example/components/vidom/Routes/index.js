import { node } from 'vidom';

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
    return node(Error).attrs({error: 'some error occurred'});
  } else if (match('/', currentPath)) {
    return node(Top);
  } else if (match('/foo/:id', currentPath)) {
    return node(Foo);
  } else if (match('/bar', currentPath)) {
    return node(Bar);
  } else {
    return node(NotFound);
  }
});
