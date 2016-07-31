import h from 'snabbdom/h';
import {inject} from 'example/store.js'

export default inject(({props}) => {
    return h('h1', {}, 'top');
  }
);
