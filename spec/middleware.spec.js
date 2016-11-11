import {
  transformLocationToPath,
  getQuery,
  routeChange,
  PUSH,
  REPLACE,
  GO,
  BACK,
  FORWARD,
  ROUTE_CHANGE,
  ROUTE_ERROR,
  INITIAL_ROUTE_RESOLVED,
  SET_NEXT_ROUTE
} from 'lib/actions.js';
import routerMiddleware, {routerMiddlewareCreator} from 'lib/middleware.js';
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
    assert.equal(location.pathname, '/sample');
  });

  it('should accept push action with history library', function(){
    const createHistory = require('history/umd/history.js').createBrowserHistory;

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
    middleware = routerMiddlewareCreator({history: createHistory()})(store)(dispatch);

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
    assert.equal(location.pathname, '/sample');
  });

  it('should accept push action with basename of history library', function(){
    const createHistory = require('history/umd/history.js').createBrowserHistory;

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
    middleware = routerMiddlewareCreator({history: createHistory({basename: '/hoge'})})(store)(dispatch);

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
    assert.equal(location.pathname, '/hoge/sample');
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

  it('should accept push action with history library', function(){
    const createHistory = require('history/umd/history.js').createBrowserHistory;

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
    middleware = routerMiddlewareCreator({history: createHistory()})(store)(dispatch);

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

  it('should put warn message on routeError if no onError handler exists.', function(done){
    const wrappedConsole = sandbox.spy(console, 'warn');
    const onEnter = sinon.spy(({state}, cb) => {
      cb(false);
    });

    assert.equal(dispatch.called, false);

    router.onEnter('/', onEnter);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    requestAnimationFrame(() => {
      assert.equal(dispatch.callCount === 4, true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: true
      }), true);
      assert.equal(dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      assert.equal(wrappedConsole.called, true);
      // should put warn message to console.
      assert.equal(wrappedConsole.calledWith(
        'You should register router.onError to handle this routing error. data =', false
      ), true);
      done();
    });
  });

  it('should dispatch routeError action if callback called with Error object', function(done){
    const err = new Error('dummy error');
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb(err);
    });

    assert.equal(dispatch.called, false);

    router.onEnter('/', onEnter);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    requestAnimationFrame(() => {
      assert.equal(dispatch.callCount === 4, true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: err
      }), true);
      assert.equal(dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should dispatch routeError action if callback called with falsy argument', function(done){
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb(false);
    });

    assert.equal(dispatch.called, false);

    router.onEnter('/', onEnter);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    requestAnimationFrame(() => {
      assert.equal(dispatch.callCount === 4, true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: true
      }), true);
      assert.equal(dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should call onError handler on routeError', function(done){
    const onError = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });

    const onEnter = sinon.spy(({state}, cb) => {
      cb(false);
    });

    assert.equal(dispatch.called, false);

    router.onError(onError);
    router.onEnter('/', onEnter);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    requestAnimationFrame(() => {
      assert.equal(dispatch.callCount === 4, true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: true
      }), true);
      assert.equal(dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      assert.equal(onError.called, true);
      done();
    });
  });

  it('should call onEnter on routeChange', function(){
    // starts with '/sample'
    history.pushState(null, null, '/sample');
    // restore current spy.
    history.pushState.restore();

    // try to spy one more time.
    history.pushState = sandbox.spy(history, 'pushState');

    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb();
    });
    router.onEnter('/sample', onEnter);

    assert.equal(dispatch.called, false);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    assert.equal(dispatch.calledThrice, true);
    assert.equal(dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED
    }), true);
    assert.equal(dispatch.calledWith({
      type: SET_NEXT_ROUTE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(location.pathname, '/sample');
  });

  it('should not call onLeave if not initialRouteResolved', function(){
    // starts with '/sample'
    history.pushState(null, null, '/sample');
    // restore current spy.
    history.pushState.restore();

    // try to spy one more time.
    history.pushState = sandbox.spy(history, 'pushState');

    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb();
    });
    router.onEnter('/sample', onEnter);

    const onLeave = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });
    router.onLeave('/sample', onLeave);

    assert.equal(dispatch.called, false);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    assert.equal(dispatch.calledThrice, true);
    assert.equal(dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED
    }), true);
    assert.equal(dispatch.calledWith({
      type: SET_NEXT_ROUTE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(onLeave.called, false);
    assert.equal(onEnter.called, true);
    assert.equal(location.pathname, '/sample');
  });

  it('should dispatch initialRouteResolved action if router\'s onEnter argument omitted.', function(done){
    const onEnter = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });

    router.onEnter('/', onEnter);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    requestAnimationFrame(() => {
      assert.ok(dispatch.callCount === 4);
      assert.equal(dispatch.calledWith({
        type: SET_NEXT_ROUTE,
        payload: createRoute('/')
      }), true);
      assert.equal(dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should not dispatch initialRouteResolved action if router\'s onEnter not calls callback.', function(done){
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
    });

    router.onEnter('/', onEnter);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    requestAnimationFrame(() => {
      assert.equal(dispatch.calledTwice, true);
      assert.equal(dispatch.calledWith({
        type: SET_NEXT_ROUTE,
        payload: createRoute('/')
      }), true);
      assert.equal(dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should not call onEnter on routeChange', function(){
    // starts with '/sample'
    history.pushState(null, null, '/sample');
    // restore current spy.
    history.pushState.restore();

    // try to spy one more time.
    history.pushState = sandbox.spy(history, 'pushState');

    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: createRoute(transformLocationToPath(location))
        }
      });
      cb();
    });
    router.onEnter('/sample', onEnter);

    assert.equal(dispatch.called, false);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    assert.equal(dispatch.calledThrice, true);
    assert.equal(dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED
    }), true);
    assert.equal(dispatch.calledWith({
      type: SET_NEXT_ROUTE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: createRoute(transformLocationToPath(location))
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(location.pathname, '/sample');
  });

  it('should call onLeave on routeChange', function(){
    const store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            isInitialRouteResolved: true,
            current: createRoute(transformLocationToPath(location), getQuery(location))
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    router = routerCreator(store);
    dispatch = store.dispatch;
    middleware = routerMiddleware(store)(dispatch);

    const onLeave = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          isInitialRouteResolved: true,
          current: createRoute(transformLocationToPath(location))
        }
      });
    });
    router.onLeave('/', onLeave);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    // starts with '/sample'
    history.pushState(null, null, '/sample');
    // restore current spy.
    history.pushState.restore();

    assert.equal(dispatch.calledOnce, true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: createRoute('/')
    }), true);

    middleware(routeChange(createRoute(transformLocationToPath(location), getQuery(location))));

    assert.equal(dispatch.calledTwice, true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(onLeave.called, true);
    assert.equal(location.pathname, '/sample');
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

    assert.equal(dispatch.calledOnce, true);
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
      type: SET_NEXT_ROUTE,
      payload: createRoute('/sample')
    }), true);
    assert.equal(dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED
    }), true);
    assert.equal(dispatch.calledWith({
      type: ROUTE_ERROR,
      payload: true
    }), true);
    assert.equal(onEnter.called, true);
    assert.equal(onError.called, true);
    assert.equal(location.pathname, '/');
  });

  it('should call router\'s onLeave hook on push after initialRouteResolved', function(){
    // starts with '/?sample=true'
    history.pushState(null, null, '/sample');
    // restore current spy.
    history.pushState.restore();

    // try to spy one more time.
    history.pushState = sandbox.spy(history, 'pushState');

    const store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            isInitialRouteResolved: true,
            current: createRoute(transformLocationToPath(location), getQuery(location))
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    router = routerCreator(store);
    dispatch = store.dispatch;
    middleware = routerMiddleware(store)(dispatch);

    const onLeave = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          isInitialRouteResolved: true,
          current: createRoute(transformLocationToPath(location), getQuery(location))
        }
      });
    });
    router.onLeave('/sample', onLeave);

    middleware({
      type: PUSH,
      payload: '/'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: PUSH,
      payload: {
        path: '/',
        route: null,
        params: null,
        query: ''
      }
    }), true);
    assert.equal(onLeave.called, true);
    assert.equal(location.pathname, '/');
  });

  it('should not call router\'s onLeave hook on push before initialRouteResolved', function(){
    // starts with '/?sample=true'
    history.pushState(null, null, '/sample');
    // restore current spy.
    history.pushState.restore();

    // try to spy one more time.
    history.pushState = sandbox.spy(history, 'pushState');

    const store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            isInitialRouteResolved: false,
            current: createRoute(transformLocationToPath(location), getQuery(location))
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    router = routerCreator(store);
    dispatch = store.dispatch;
    middleware = routerMiddleware(store)(dispatch);

    const onLeave = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          isInitialRouteResolved: false,
          current: createRoute(transformLocationToPath(location), getQuery(location))
        }
      });
    });
    router.onLeave('/sample', onLeave);

    middleware({
      type: PUSH,
      payload: '/'
    });

    assert.equal(dispatch.called, true);
    assert.equal(dispatch.calledWith({
      type: PUSH,
      payload: {
        path: '/',
        route: null,
        params: null,
        query: ''
      }
    }), true);
    assert.equal(onLeave.called, false);
    assert.equal(location.pathname, '/');
  });
});

