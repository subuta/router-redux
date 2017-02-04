import {
  REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE,
  LOCATION_CHANGE_FAILURE
} from 'lib/actions.js';

import reducer from 'lib/reducer.js';

describe('reducer', function() {
  beforeEach(function(){
  });

  it('should return initial state', function(){
    const initialState = {
      current: null,
      next: null,
      last: null,
      routeError: null,
      isLoading: false
    };
    assert.deepEqual(reducer(initialState, {}), {
      current: null,
      next: null,
      last: null,
      routeError: null,
      isLoading: false
    });
  });

  it('should accept REQUEST_LOCATION_CHANGE', function(){
    const initialState = {
      current: {pathname: '/'},
      next: null,
      last: null,
      routeError: null,
      isLoading: false
    };

    // should apply these changes
    // 1. put new payload to next
    // 2. make isLoading true
    assert.deepEqual(reducer(initialState, {type: REQUEST_LOCATION_CHANGE, payload: {pathname: '/foo'}}), {
      current: {pathname: '/'},
      next: {pathname: '/foo'},
      last: null,
      routeError: null,
      isLoading: true
    });
  });

  it('should accept LOCATION_CHANGE', function(){
    const initialState = {
      current: {pathname: '/'},
      next: true,
      last: null,
      routeError: true,
      isLoading: true
    };

    // should apply these changes
    // 1. move current to last
    // 2. put new payload to current
    // 3. set null to next/routeError
    // 4. make isLoading false
    assert.deepEqual(reducer(initialState, {type: LOCATION_CHANGE, payload: {pathname: '/foo'}}), {
      current: {pathname: '/foo'},
      next: null,
      last: {pathname: '/'},
      routeError: null,
      isLoading: false
    });
  });

  it('should accept LOCATION_CHANGE_FAILURE', function(){
    const initialState = {
      current: {pathname: '/'},
      next: true,
      last: null,
      routeError: null,
      isLoading: true
    };

    const error = new Error('dummy error');

    // should apply these changes
    // 1. put new payload to next
    // 2. make isLoading false
    assert.deepEqual(reducer(initialState, {type: LOCATION_CHANGE_FAILURE, payload: error}), {
      current: {pathname: '/'},
      next: null,
      last: null,
      routeError: error,
      isLoading: false
    });
  });
});
