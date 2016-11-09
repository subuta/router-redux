import React from 'react'
import ReactDOM from 'react-dom'

import store, {inject} from 'example/store.js'

import Header from './Header.js';
import Routes from './Routes/index.js';

const render = inject(({state}) => {
  return (
    <div id="app-container">
      <Header/>
      <Routes/>
    </div>
  );
});

export default () => {
  console.log('react example loaded');
  // Patch into empty DOM element – this modifies the DOM as a side effect
  // - with diff then patch(efficient way / with vdom)
  const update = () => {
    ReactDOM.render(
      render(),
      document.querySelector('#app-container')
    )
  };

  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    update();
  } else {
    document.addEventListener('DOMContentLoaded', update);
  }

  store.subscribe(update);
}
