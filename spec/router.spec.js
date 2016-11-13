import {createStore} from 'redux/dist/redux.js';
import routerCreator from 'lib/router.js';

describe('routerCreator', function() {

  let store;
  beforeEach(function(){
    history.pushState(null, null, '/');
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {});
  });

  it('should create router', function(){
    const router = routerCreator(store)
    assert.deepEqual(router.routes, {});
    assert.equal(typeof router.on, 'function');
  });
});
