import {
  transformLocationToPath,
  getQuery,
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  ROUTE_ERROR,
  INITIAL_ROUTE_RESOLVED,
  SET_NEXT_ROUTE
} from 'lib/actions.js';
import routerMiddleware from 'lib/middleware.js';
import routerCreator, {
  createRoute
} from 'lib/router.js';

describe('middleware', function() {

  let middleware;
  let dispatch;
  let sandbox;
  let router;
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
    const store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            current: createRoute(transformLocationToPath(location))
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    // starts with '/'
    history.pushState(null, null, '/');

    // spy history methods
    history.pushState = sandbox.spy(history, 'pushState');
    history.replaceState = sandbox.spy(history, 'replaceState');
    history.go = sandbox.spy(history, 'go');
    history.back = sandbox.spy(history, 'back');
    history.forward = sandbox.spy(history, 'forward');

    router = routerCreator(store);
    dispatch = store.dispatch;
    middleware = routerMiddleware(store)(dispatch);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should accept push action', function(){
    middleware({
      type: PUSH,
      payload: '/sample'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: PUSH,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(history.pushState.called, true);
  });

  it('should not accept duplicated push action', function(){
    // try to change url from '/' to '/'
    middleware({
      type: PUSH,
      payload: '/'
    });

    assert.equal(dispatch.called, false);
    assert.equal(history.pushState.called, false);
  });

  it('should not accept duplicated push action even if url has query param', function(){
    // starts with '/?sample=true'
    history.pushState(null, null, '/?sample=true');
    // restore current spy.
    history.pushState.restore();

    // try to spy one more time.
    history.pushState = sandbox.spy(history, 'pushState');

    const store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            current: createRoute(transformLocationToPath(location), getQuery(location))
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    router = routerCreator(store);
    dispatch = store.dispatch;
    middleware = routerMiddleware(store)(dispatch);

    // try to change url from '/?sample=true' to '/?sample=true'
    middleware({
      type: PUSH,
      payload: '/?sample=true'
    });

    assert.equal(dispatch.called, false);
    // ensure pushState to sample url not called.
    assert.equal(history.pushState.called, false);
  });

  it('should accept replace action', function(){
    middleware({
      type: REPLACE,
      payload: '/sample'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: REPLACE,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(history.replaceState.called, true);
  });

  it('should accept go action', function(){
    middleware({
      type: GO,
      payload: -1
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: GO,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(history.go.called, true);
  });

  it('should accept back action', function(){
    middleware({
      type: BACK
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: BACK,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(history.back.called, true);
  });

  it('should accept forward action', function(){
    middleware({
      type: FORWARD
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: FORWARD,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(history.forward.called, true);
  });

  it('should pass-through other action', function(){
    middleware({});

    assert.equal(dispatch.calledWith({}), true);
    assert.equal(dispatch.called, true);
  });

  it('should call router\'s onEnter hook on push', function(){
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb();
    });
    router.onEnter('/sample', onEnter);

    middleware({
      type: PUSH,
      payload: '/sample'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: PUSH,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(location.pathname, '/sample');
  });

  it('should call router\'s onEnter hook on push even if omit cb argument', function(){
    const onEnter = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });
    router.onEnter('/sample', onEnter);

    middleware({
      type: PUSH,
      payload: '/sample'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: PUSH,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(location.pathname, '/sample');
  });

  it('should not dispatch history action if router\'s onEnter not calls callback.', function(){
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });
    router.onEnter('/sample', onEnter);

    middleware({
      type: PUSH,
      payload: '/sample'
    });

    assert.equal(dispatch.calledTwice, true);
    assert.equal(dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED
    }), true);
    assert.equal(dispatch.calledWith({
      type: SET_NEXT_ROUTE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(location.pathname, '/');
  });

  it('should not dispatch history action if router\'s onEnter calls callback with falsy value.', function(){
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb(false);
    });
    const onError = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });

    router.onError(onError);
    router.onEnter('/sample', onEnter);

    middleware({
      type: PUSH,
      payload: '/sample'
    });

    assert.equal(dispatch.callCount === 3, true);
    assert.equal(dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED
    }), true);
    assert.equal(dispatch.calledWith({
      type: SET_NEXT_ROUTE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_ERROR,
      payload: true
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(onError.called, true);
    assert.equal(location.pathname, '/');
  });

  it('should call router\'s onLeave hook on push', function(){
    const onLeave = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });
    router.onLeave('/', onLeave);

    middleware({
      type: PUSH,
      payload: '/sample'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: PUSH,
      payload: {
        path: '/sample',
        route: null,
        params: null,
        query: ''
      }
    }), true);
    assert.equal(onLeave.called, true);
    assert.equal(location.pathname, '/sample');
  });
});

