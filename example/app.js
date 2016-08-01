import snabbdom from 'snabbdom';
import classModule from 'snabbdom/modules/class';
import propsModule from 'snabbdom/modules/props';
import attrsModule from 'snabbdom/modules/attributes';
import styleModule from 'snabbdom/modules/style';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import h from 'snabbdom/h';

import store, {inject} from './store.js'

import Header from './components/Header.js';
import Routes from './components/Routes.js';

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

let container = document.querySelector('#app-container');

// Patch into empty DOM element – this modifies the DOM as a side effect
let tree = render(); // We need an initial tree
patch(container, tree);

// - with diff then patch(efficient way / with vdom)
const update = () => {
  var newTree = render();
  patch(tree, newTree);
  tree = newTree;
};

const unSubscribe = store.subscribe(update);

export const _reload = () => {
  update();
};

export const _unload = () => {
  unSubscribe();
};
