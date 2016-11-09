import React from 'react'

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

  return (
    <div id="header" style={headerStyle}>
      <a href="/" style={linkStyle} onClick={pushOnClick('/')}>top</a>
      <a href="/foo/1?sample=true" style={linkStyle} onClick={pushOnClick('/foo/1?sample=true')}>foo</a>
      <a href="/bar" style={linkStyle} onClick={pushOnClick('/bar')}>bar</a>
    </div>
  );
});
