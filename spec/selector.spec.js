import {
  hasRouting,
  getCurrent,
  getLast,
  getNext,
  getRouteError,
  getIsLoading
} from 'lib/selector.js';

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
  it('should return current from the state', function(){
    assert.equal(getCurrent({routing: {current: 'sample'}}), 'sample');
  });

  it('should return last from the state', function(){
    assert.equal(getLast({routing: {last: 'sample'}}), 'sample');
  });

  it('should return next from the state', function(){
    assert.equal(getNext({routing: {next: 'sample'}}), 'sample');
  });

  it('should return routeError from the state', function(){
    assert.equal(getRouteError({routing: {routeError: true}}), true);
  });

  it('should return isLoading from the state', function(){
    assert.equal(getIsLoading({routing: {isLoading: true}}), true);
  });
});
