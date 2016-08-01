import h from 'snabbdom/h';

import {
  inject
} from 'example/store.js'

import {
  push
} from 'lib/index.js';

export default inject(({dispatch}) => {

  // call pushState instead of location change.
  const pushOnClick = (path) => (e) => {
    e.preventDefault();
    dispatch(push(path))
  };

  const headerStyle = {
    backgroundColor: '#dddddd'
  };

  const linkStyle = {
    margin: '8px'
  };

  return h('div#header',
    {style: headerStyle},
    [
      h('a', {style: linkStyle, attrs: {href: '/'}, on:{click: pushOnClick('/')}}, 'top'),
      h('a', {style: linkStyle, attrs: {href: '/test'}, on:{click: pushOnClick('/test')}}, 'test'),
      h('a', {style: linkStyle, attrs: {href: '/foo'}, on:{click: pushOnClick('/foo')}}, 'foo')
    ]);
});
