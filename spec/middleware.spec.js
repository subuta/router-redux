import {
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD
} from 'lib/actions.js';
import middlewareCreator from 'lib/middleware.js';

describe('middleware', function() {

  let middleware;
  let dispatch;
  let sandbox;
  beforeEach(function(){
    sandbox = sinon.sandbox.create();

    // starts with '/'
    history.pushState(null, null, '/');

    // spy history methods
    history.pushState = sandbox.spy(history, 'pushState');
    history.replaceState = sandbox.spy(history, 'replaceState');
    history.go = sandbox.spy(history, 'go');
    history.back = sandbox.spy(history, 'back');
    history.forward = sandbox.spy(history, 'forward');

    dispatch = sandbox.spy((action) => action);
    middleware = middlewareCreator(history)({})(dispatch);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should accept push action', function(){
    assert.deepEqual(middleware({
      type: PUSH,
      payload: '/test'
    }), {
      type: PUSH,
      payload: location
    });
    assert.equal(dispatch.called, true);
    assert.equal(history.pushState.called, true);
  });

  it('should not accept duplicated push action', function(){
    // try to change url from '/' to '/'
    assert.deepEqual(middleware({
      type: PUSH,
      payload: '/'
    }), undefined);
    assert.equal(dispatch.called, false);
    assert.equal(history.pushState.called, false);
  });

  it('should accept replace action', function(){
    assert.deepEqual(middleware({
      type: REPLACE,
      payload: '/test'
    }), {
      type: REPLACE,
      payload: location
    });
    assert.equal(dispatch.called, true);
    assert.equal(history.replaceState.called, true);
  });

  it('should accept go action', function(){
    assert.deepEqual(middleware({
      type: GO,
      payload: -1
    }), {
      type: GO,
      payload: location
    });
    assert.equal(dispatch.called, true);
    assert.equal(history.go.called, true);
  });

  it('should accept back action', function(){
    assert.deepEqual(middleware({
      type: BACK
    }), {
      type: BACK,
      payload: location
    });
    assert.equal(dispatch.called, true);
    assert.equal(history.back.called, true);
  });

  it('should accept forward action', function(){
    assert.deepEqual(middleware({
      type: FORWARD
    }), {
      type: FORWARD,
      payload: location
    });
    assert.equal(dispatch.called, true);
    assert.equal(history.forward.called, true);
  });

  it('should pass-through other action', function(){
    assert.deepEqual(middleware({}), {});
    assert.equal(dispatch.called, true);
  });
});

