import React from 'react'

import {
  inject,
  router
} from 'example/store.js'

import {
  getIsLoading
} from 'router-redux';

import Top, {onEnter, onLeave} from './Top.js';
import Bar from './Bar.js';
import Foo from './Foo.js';
import NotFound from './NotFound.js';
import Error from './Error.js';

router.on('*', () => <NotFound/>)
router.on('/error', () => <Error/>)
router.on('/', <Top onEnter={onEnter} onLeave={onLeave}/>)
router.on('/foo/:id', Foo)
router.on('/bar', () => <Bar/>)

export default inject(({state}) => {
  if (getIsLoading(state)) {
    return <h1>loading ...</h1>
  }
  return router.render();
});
