import {
  routeChange,
  routeError,
  initialRouteResolved,
  push,
  replace,
  go,
  back,
  forward,
  isHistoryAction
} from 'lib/actions.js';

describe('actions', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should create routeChange action', function(){
    assert.deepEqual(routeChange(location), {
      type: '@@router-redux/ROUTE_CHANGE',
      payload: location
    });
  });

  it('should create routeError action', function(){
    const err = new Error('dummy error');
    assert.deepEqual(routeError(err), {
      type: '@@router-redux/ROUTE_ERROR',
      payload: err
    });
  });

  it('should create routeError action with falsy value', function(){
    assert.deepEqual(routeError(false), {
      type: '@@router-redux/ROUTE_ERROR',
      payload: true
    });
  });

  it('should create initialRouteResolved action', function(){
    assert.deepEqual(initialRouteResolved(), {
      type: '@@router-redux/INITIAL_ROUTE_RESOLVED'
    });
  });

  it('should create push action', function(){
    assert.deepEqual(push('/sample'), {
      type: '@@router-redux/HISTORY_PUSH_STATE',
      payload: '/sample'
    });
  });

  it('should create replace action', function(){
    assert.deepEqual(replace('/sample'), {
      type: '@@router-redux/HISTORY_REPLACE_STATE',
      payload: '/sample'
    });
  });

  it('should create go action', function(){
    assert.deepEqual(go(1), {
      type: '@@router-redux/HISTORY_GO',
      payload: 1
    });
  });

  it('should create back action', function(){
    assert.deepEqual(back(), {
      type: '@@router-redux/HISTORY_BACK'
    });
  });

  it('should create forward action', function(){
    assert.deepEqual(forward(), {
      type: '@@router-redux/HISTORY_FORWARD'
    });
  });
});

describe('isHistoryAction', function() {
  it('should return true with valid string', function(){
    assert.equal(isHistoryAction('@@router-redux/HISTORY_PUSH_STATE'), true);
  });

  it('should return true with invalid string', function(){
    assert.equal(isHistoryAction('@@router-redux/ROUTE_CHANGE'), false);
  });

  it('should return false with null', function(){
    assert.equal(isHistoryAction(null), false);
  });
});
