import h from 'snabbdom/h';
import {inject} from 'example/store.js'
import {
  push
} from 'lib/index.js';

export default inject(({dispatch, props}) => {
  return h('h1', {
    on: {
      'click': (e) => {
        dispatch(push('/test'))
      }
    }
  }, 'top');
});
