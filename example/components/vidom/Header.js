import { node } from 'vidom';

import {
  inject
} from 'example/store.js'

import {
  push
} from 'router-redux';

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

  return node('div').attrs({id: 'header', style: headerStyle}).children([
    node('a').attrs({href: '/', style: linkStyle, onClick: pushOnClick('/')}).children('top'),
    node('a').attrs({href: '/foo/1?sample=true', style: linkStyle, onClick: pushOnClick('/foo/1?sample=true')}).children('foo'),
    node('a').attrs({href: '/bar', style: linkStyle, onClick: pushOnClick('/bar')}).children('bar')
  ]);
});
