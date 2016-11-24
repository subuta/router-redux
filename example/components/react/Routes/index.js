import React from 'react'

import {
  router
} from 'example/store.js'

import {
  getCurrent,
  match
} from 'router-redux';

// import Top from './Top.js';
// import Bar from './Bar.js';
import Foo from './Foo.js';
import NotFound from './NotFound.js';
import Error from './Error.js';

router.on('*', () => <NotFound/>)
router.on('/error', () => <Error error="some error occurred"/>)
// router.on('/', () => <Top/>)
router.on('/foo/:id', Foo)
// router.on('/bar', () => <Bar/>)

export default () => {
  return router.render();
};
