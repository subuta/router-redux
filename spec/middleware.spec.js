import configureStore from 'redux-mock-store';
import middleware from 'lib/middleware.js';

import {
  // REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE
  // LOCATION_CHANGE_FAILURE
} from 'lib/actions.js';

describe('middleware', function() {
  let sandbox;
  let store;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = configureStore([middleware])({});
  });

  it('should call passed action', function(){
    store.dispatch({type: 'dummy'})
    assert.deepEqual(store.getActions(), [{type: 'dummy'}]);
  });

  it('should accept LOCATION_CHANGE action via push', function(){
    store.dispatch({type: LOCATION_CHANGE})
    assert.deepEqual(store.getActions(), [{type: LOCATION_CHANGE}]);
  });
});
