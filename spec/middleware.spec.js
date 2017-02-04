import configureStore from 'redux-mock-store';
import middleware from 'lib/middleware.js';

import {
  REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE
} from 'lib/actions.js';

describe('middleware', function () {
  var sandbox;
  var store;
  var history;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = configureStore([ middleware ])({});
    history = window.history;

    // starts with /
    window.history.pushState(null, null, '/');

    history.pushState = sandbox.spy(history, 'pushState');
    history.replaceState = sandbox.spy(history, 'replaceState');
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should call passed action', function () {
    store.dispatch({ type: 'dummy' })
    assert.deepEqual(store.getActions(), [ { type: 'dummy' } ]);
  });

  it('should accept REQUEST_LOCATION_CHANGE action via push', function () {
    store.dispatch({ type: REQUEST_LOCATION_CHANGE, payload: { via: 'push', pathname: '/foo' } })
    assert.deepEqual(store.getActions(), [ { type: REQUEST_LOCATION_CHANGE, payload: { pathname: '/foo', search: '', route: null, params: null } } ]);
    assert.equal(history.pushState.called, false)
  });

  it('should not accept LOCATION_CHANGE action via push if it makes no path changes', function () {
    store.dispatch({ type: LOCATION_CHANGE, payload: { via: 'push', pathname: '/' } })
    assert.deepEqual(store.getActions(), [ { type: LOCATION_CHANGE, payload: { pathname: '/', search: '', route: null, params: null } } ]);
    assert.equal(history.pushState.called, false)
  });

  it('should accept LOCATION_CHANGE action via push', function () {
    store.dispatch({ type: LOCATION_CHANGE, payload: { via: 'push', pathname: '/foo' } })
    assert.deepEqual(store.getActions(), [ { type: LOCATION_CHANGE, payload: { pathname: '/foo', search: '', route: null, params: null } } ]);
    assert.equal(history.pushState.called, true)
  });

  it('should accept LOCATION_CHANGE action via replace', function () {
    store.dispatch({ type: LOCATION_CHANGE, payload: { via: 'replace', pathname: '/foo' } })
    assert.deepEqual(store.getActions(), [ { type: LOCATION_CHANGE, payload: { pathname: '/foo', search: '', route: null, params: null } } ]);
    assert.equal(history.replaceState.called, true)
  });
});
