import h from 'snabbdom/h';

import {
  inject,
  router
} from 'example/store.js'

import {
  getIsLoading,
  getCurrent,
  match
} from 'router-redux';

import Top, {onEnter, onLeave} from './Top.js';
import Bar from './Bar.js';
import Foo from './Foo.js';
import NotFound from './NotFound.js';
import Error from './Error.js';

router.on('*', NotFound)
router.on('/error', Error)
router.on('/', {render:Top, onEnter, onLeave})
router.on('/foo/:id', Foo)
router.on('/bar', Bar)

export default inject(({state}) => {
  if (getIsLoading(state)) {
    return h('h1', {}, 'loading ...');
  }
  return router.render();
});
