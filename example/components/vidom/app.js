import { mount, node, unmount } from 'vidom';

import store, {inject} from 'example/store.js'

import Header from './Header.js';
import Routes from './Routes/index.js';

const render = inject(({state}) => {
  return node('div').attrs({id: 'app-container'}).children([
    node(Header),
    node(Routes)
  ]);
});

export default () => {
  console.log('vidom example loaded');
  var container = document.querySelector('#app-container');
  const update = () => {
    container = document.querySelector('#app-container')
    if (!container) {return}
    mount(container, render())
  }

  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    update();
  } else {
    document.addEventListener('DOMContentLoaded', update);
  }

  // call update on store changes.
  store.subscribe(update);
}
