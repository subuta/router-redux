import {
  ROUTE_CHANGE,
  ROUTE_ERROR,
  INITIAL_ROUTE_RESOLVED,
  transformLocationToPath,
  getQuery
} from 'lib/actions.js';

import routerCreator, {
  getRoutes,
  createRoute
} from 'lib/router.js';

describe('routerCreator', function() {

  let store;
  let sandbox;
  let clock;
  beforeEach(function(){
    // starts with '/'
    history.pushState(null, null, '/');
    sandbox = sinon.sandbox.create();
    clock = sandbox.useFakeTimers();
    store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            current: { path: '/', route: null, params: null, query: '' }
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };
    window.addEventListener = sandbox.spy(window, 'addEventListener');
    window.removeEventListener = sandbox.spy(window, 'removeEventListener');
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should register popState on creation', function(){
    routerCreator(store);
    assert.equal(window.addEventListener.called, true);
    assert.equal(window.addEventListener.calledWith('popstate'), true);
  });

  it('destroy should unregister popState', function(){
    const router = routerCreator(store);
    router.destroy();
    assert.equal(window.removeEventListener.called, true);
    assert.equal(window.removeEventListener.calledWith('popstate'), true);
  });

  it('should dispatch routeChange action on popState', function(){
    routerCreator(store);
    assert.equal(store.dispatch.called, false);

    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);

    assert.equal(store.dispatch.called, true);
    assert.equal(store.dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: createRoute(transformLocationToPath(location))
    }), true);
  });

  it('should not dispatch routeChange action on popState after destroy called.', function(){
    const router = routerCreator(store);
    assert.equal(store.dispatch.called, false);

    router.destroy();

    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);

    assert.equal(store.dispatch.called, false);
  });

  it('onEnter should add routes', function(){
    const router = routerCreator(store);
    const onEnter = sinon.spy();
    router.onEnter('/', onEnter);
    assert.deepEqual(getRoutes(), {
      '/': {
        onEnter
      }
    });
  });

  it('onEnter should add routes and call route once if currentPath includes query string', function(done){
    history.pushState(null, null, '/?sample=true');

    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}, cb) => { cb(); });
    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.callCount === 2, true); // should wait for callback called.
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location), getQuery(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('onEnter should add routes and call route once if currentPath includes params', function(done){
    history.pushState(null, null, '/foo/1');
    // update store with current state.
    store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            current: { path: '/foo/1', route: '/foo/:id', params: {id: 1}, query: '' }
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/foo/1', route: '/foo/:id', params: {id: 1}, query: '' }
        }
      });
      cb();
    });

    router.onEnter('/foo/:id', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.callCount === 2, true); // should wait for callback called.
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('onEnter should add routes and call route once if currentPath matched', function(done){
    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/', route: null, params: null, query: '' }
        }
      });

      setTimeout(() => {
        cb();
      }, 3000);
    });

    assert.equal(store.dispatch.called, false);

    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      clock.tick(2999);
      assert.equal(store.dispatch.callCount === 1, true); // should wait for callback called.

      clock.tick(1);

      assert.equal(store.dispatch.callCount === 2, true);
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should dispatch routeError action if callback called with falsy argument', function(done){
    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/', route: null, params: null, query: '' }
        }
      });
      cb(false);
    });

    assert.equal(store.dispatch.called, false);

    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.callCount === 3, true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: true
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should call onError handler on routeError', function(done){
    const router = routerCreator(store);
    const onError = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/', route: null, params: null, query: '' }
        }
      });
    });

    const onEnter = sinon.spy(({state}, cb) => {
      cb(false);
    });

    assert.equal(store.dispatch.called, false);

    router.onError(onError);
    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.callCount === 3, true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: true
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      assert.equal(onError.called, true);
      done();
    });
  });

  it('should put warn message on routeError if no onError handler exists.', function(done){
    const wrappedConsole = sandbox.spy(console, 'warn');
    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}, cb) => {
      cb(false);
    });

    assert.equal(store.dispatch.called, false);

    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.callCount === 3, true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: true
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
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
    const router = routerCreator(store);
    const err = new Error('dummy error');
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/', route: null, params: null, query: '' }
        }
      });
      cb(err);
    });

    assert.equal(store.dispatch.called, false);

    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.callCount === 3, true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_ERROR,
        payload: err
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: INITIAL_ROUTE_RESOLVED
      }), true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('should not dispatch initialRouteResolved action if router\'s onEnter argument omitted.', function(done){
    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/', route: null, params: null, query: '' }
        }
      });
    });

    router.onEnter('/', onEnter);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.called, true);
      assert.equal(getRoutes()['/'].onEnter.called, true);
      done();
    });
  });

  it('should not dispatch initialRouteResolved action if router\'s onEnter not calls callback.', function(done){
    const router = routerCreator(store);
    const onEnter = sinon.spy(({state}, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: { path: '/', route: null, params: null, query: '' }
        }
      });
    });

    router.onEnter('/', onEnter);
    requestAnimationFrame(() => {
      assert.equal(store.dispatch.called, true);
      assert.equal(onEnter.called, true);
      done();
    });
  });

  it('onLeave should add routes', function(){
    const router = routerCreator(store);
    const onLeave = sinon.spy();
    router.onLeave('/', onLeave);
    assert.deepEqual(getRoutes(), {
      '/': {
        onLeave
      }
    });
  });
});

describe('getRoutes', function() {
  let router;
  beforeEach(function(){
    const store = {
      getState: sinon.spy(() => {}),
      dispatch: sinon.spy(() => {})
    };
    router = routerCreator(store);
  });

  it('should return routes', function(){
    assert.deepEqual(getRoutes(), {});
  });
});

describe('createRoute', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should create route object', function(){
    assert.deepEqual(createRoute(transformLocationToPath(location)), {
      path: '/',
      route: null,
      params: null,
      query: ''
    });
  });

  it('should create route object with query param', function(){
    history.pushState(null, null, '/sample?hoge=true&fuga=true');
    assert.deepEqual(createRoute(transformLocationToPath(location), getQuery(location)), {
      path: '/sample',
      route: null,
      params: null,
      query: 'hoge=true&fuga=true'
    });
  });
});
