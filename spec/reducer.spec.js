import {
  ROUTE_CHANGE,
  ROUTE_ERROR,
  INITIAL_ROUTE_RESOLVED,
  SET_NEXT_ROUTE
} from 'lib/actions.js';

import reducer from 'lib/reducer.js';

describe('reducer', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should return initial state', function(){
    // manually pass initial state to reducer,
    // because wallaby uses their internal script(/wallaby_sandbox0.html) for testing.
    const initialState = {
      current: location.pathname,
      last: null
    };

    assert.deepEqual(reducer(initialState, {}), {
      current: '/',
      last: null
    });
  });

  it('should apply routeChange to state', function(){
    history.pushState(null, null, '/sample');
    assert.deepEqual(reducer({
      current: '/',
      last: null
    }, {
      type: ROUTE_CHANGE,
      payload: {
        path: '/sample',
        route: null,
        params: null,
        query: ''
      }
    }), {
      current: { path: '/sample', route: null, params: null, query: '' },
      last: '/',
      next: null,
      routeError: null
    });
  });

  it('should apply routeError to state', function(){
    assert.deepEqual(reducer({
      current: '/',
      last: null,
      routeError: false
    }, {
      type: ROUTE_ERROR,
      payload: true
    }), {
      current: '/',
      last: null,
      routeError: true,
      next: null
    });
  });

  it('should apply setNextRoute to state', function(){
    assert.deepEqual(reducer({
      current: '/',
      last: null,
      routeError: false
    }, {
      type: SET_NEXT_ROUTE,
      payload: true
    }), {
      current: '/',
      last: null,
      routeError: false,
      next: true
    });
  });

  it('should apply initialRouteResolved to state', function(){
    assert.deepEqual(reducer({
      current: '/',
      last: null,
      isInitialRouteResolved: false
    }, {
      type: INITIAL_ROUTE_RESOLVED
    }), {
      current: '/',
      last: null,
      isInitialRouteResolved: true
    });
  });
});
