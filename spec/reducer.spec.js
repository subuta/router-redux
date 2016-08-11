import {
  ROUTE_CHANGE
} from 'lib/actions.js';
import reducer, {
  transformToPath,
  hasRouting,
  getCurrent,
  getLast
} from 'lib/reducer.js';

describe('reducer', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should return initial state', function(){
    // manually pass initial state to reducer,
    // because wallaby uses their internal script(/wallaby_sandbox0.html) for testing.
    const initialState = {
      current: transformToPath(location),
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
      payload: location
    }), {
      current: '/sample',
      last: '/'
    });
  });
});

describe('transformToPath', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should transform location to string', function(){
    assert.equal(transformToPath(location), '/');
  });
});

describe('hasRouting', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should return null with valid state', function(){
    assert.equal(hasRouting({routing: {}}), true);
  });

  it('should return null with invalid state', function(){
    assert.equal(hasRouting({}), null);
  });
});

describe('selectors', function() {
  it('should return current in the state', function(){
    assert.equal(getCurrent({routing: {current: 'sample'}}), 'sample');
  });

  it('should return last in the state', function(){
    assert.equal(getLast({routing: {last: 'sample'}}), 'sample');
  });
});
