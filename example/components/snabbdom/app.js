import snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import attrsModule from 'snabbdom/modules/attributes';
import styleModule from 'snabbdom/modules/style';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import h from 'snabbdom/h';

import store, {inject} from 'example/store.js'

import Header from './Header.js';
import Routes from './Routes/index.js';

const patch = snabbdom.init([ // Init patch function with choosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  attrsModule, // for setting attributes on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventlistenersModule // attaches event listeners
]);

const render = inject(({state}) => {
  return h('div#app-container',
    {},
    [
      Header(),
      Routes()
    ]);
});

export default () => {
  console.log('snabbdom example loaded');
  // Patch into empty DOM element – this modifies the DOM as a side effect
  let tree = document.querySelector('#app-container'); // We need an initial tree

  // - with diff then patch(efficient way / with vdom)
  const update = () => {
    var newTree = render();
    patch(tree, newTree);
    tree = newTree;
  };

  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    update();
  } else {
    document.addEventListener('DOMContentLoaded', update);
  }

  store.subscribe(update);
}
