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
      h('a', {style: linkStyle, attrs: {href: '/foo/1?sample=true'}, on:{click: pushOnClick('/foo/1?sample=true')}}, 'foo'),
      h('a', {style: linkStyle, attrs: {href: '/bar'}, on:{click: pushOnClick('/bar')}}, 'bar')
    ]);
});
