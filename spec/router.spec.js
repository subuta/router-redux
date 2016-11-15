import configureStore from 'redux-mock-store';
import createRouter, {
  findRouteKeyByPath,
  enrichLocation,
  createRouterAction,
  getRoutes,
  getHistory
} from 'lib/router.js';

import createLocation from 'lib/location.js';

import {
  REQUEST_LOCATION_CHANGE,
  LOCATION_CHANGE,
  LOCATION_CHANGE_FAILURE
} from 'lib/actions.js';

describe('createRouter', function () {
  let sandbox;
  let store;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    store = configureStore([])({});
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should create router', function () {
    const router = createRouter(store)
    assert.deepEqual(getRoutes(), {});
    assert.equal(typeof router.on, 'function');
    assert.equal(typeof router.onError, 'function');
    assert.equal(typeof router.render, 'function');
    assert.equal(typeof router.destroy, 'function');
    // history action
    assert.equal(typeof router.push, 'function');
    assert.equal(typeof router.replace, 'function');
    assert.equal(typeof router.go, 'function');
    assert.equal(typeof router.back, 'function');
    assert.equal(typeof router.forward, 'function');
  });
});

describe('router.on', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    store = configureStore([])({});
    router = createRouter(store);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should set route', function () {
    const render = sandbox.spy();
    let route = {
      render
    }

    router.on('/', route)

    assert.deepEqual(getRoutes(), {
      '/': { render }
    });

    // mutate route for check route is deep copied.
    route.render = () => {}

    assert.deepEqual(getRoutes(), {
      '/': { render }
    });
  });

  it('should set function as render', function () {
    const render = sandbox.spy();

    router.on('/', render)

    assert.deepEqual(getRoutes(), {
      '/': { render }
    });
  });
});

describe('router.render', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    store = configureStore([])({
      routing: {
        current: {
          path: '/',
          route: '/',
          params: {},
          query: ''
        }
      }
    });
    store.getState = sandbox.spy(store, 'getState');
    router = createRouter(store);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should return correct route', function () {
    assert.equal(store.getState.called, false);

    const render = sandbox.spy(() => true);
    router.on('/', render)

    const result = router.render();

    assert.equal(render.called, true);
    // ensure render uses latest state.
    assert.equal(store.getState.called, true);
    assert.equal(result, true)
  });

  it('should dispatch location change if current is not defined yet', function () {
    history.pushState(null, null, '/');

    store = configureStore([])({
      routing: {
        current: null
      }
    });
    store.getState = sandbox.spy(store, 'getState');
    router = createRouter(store);

    assert.equal(store.getState.called, false);

    const render = sandbox.spy();
    router.on('/', render)

    router.render()

    // should call location change.
    assert.deepEqual(store.getActions(), [{type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}])
    // ensure render uses latest state.
    assert.equal(store.getState.called, true);
    assert.equal(render.called, false);
  });

  it('should return correct route even if path contains path syntax', function () {
    store = configureStore([])({
      routing: {
        current: {
          path: '/1',
          route: '/:id',
          params: {id: 1},
          query: ''
        }
      }
    });
    router = createRouter(store);

    const render = sandbox.spy(() => true);
    router.on('/:id', render)

    const result = router.render();

    assert.equal(render.called, true);
    assert.equal(result, true)
  });
});

describe('router.destroy', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    store = configureStore([])({});
    router = createRouter(store);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should call store\'s unsubscribe and history\'s unlisten.', function () {
    store = configureStore([])({});

    const unsubscribe = sandbox.spy();
    const unlisten = sandbox.spy();

    store.subscribe = sandbox.spy(() => unsubscribe);
    history.listen = sandbox.spy(() => unlisten);

    router = createRouter(store);
    router.destroy();

    assert.equal(store.subscribe.called, true);
    assert.equal(unsubscribe.calledOnce, true);
    assert.equal(unlisten.calledOnce, true);
  });
});

describe('getRoutes', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    store = configureStore([])({});
    router = createRouter(store);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should return routes', function () {
    assert.deepEqual(getRoutes(), {});
  });
});

describe('getHistory', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    store = configureStore([])({});
    router = createRouter(store);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should return history polyfill', function () {
    const history = getHistory()
    assert.equal(history.isPolyfill, true);
  });
});

describe('findRouteKeyByPath', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = configureStore([])({
      current: {
        path: '/',
        route: '/',
        params: {},
        query: ''
      }
    });
    router = createRouter(store);
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should return correct key', function () {
    router.on('/', sandbox.spy())
    assert.equal(findRouteKeyByPath('/'), '/');
  });

  it('should not return key if not anything registered.', function () {
    assert.equal(findRouteKeyByPath('/'), null);
  });

  it('should return correct key even if path contains path syntax', function () {
    router.on('/:id', sandbox.spy())
    assert.equal(findRouteKeyByPath('/1'), '/:id');
  });
});

describe('enrichLocation', function() {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = configureStore([])({});
    router = createRouter(store);
    // starts with /
    window.history.pushState(null, null, '/');
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should add more information to location', function(){
    history.pushState(null, null, '/');
    assert.deepEqual(enrichLocation(createLocation()), {
      pathname: '/',
      search: '',
      route: null,
      params: null
    });
  });

  it('should add more information to location even if it contains query string', function(){
    history.pushState(null, null, '/sample?hoge=true&fuga=true');
    assert.deepEqual(enrichLocation(createLocation()), {
      pathname: '/sample',
      search: 'hoge=true&fuga=true',
      route: null,
      params: null
    });
  });
});

describe('createRouterAction', function() {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = configureStore([])({});
    router = createRouter(store);
    // starts with /
    window.history.pushState(null, null, '/');
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should dispatch REQUEST_LOCATION_CHANGE and LOCATION_CHANGE action', function(){
    // initialize store with dummy reducer
    store = configureStore([])({routing: {next: {pathname: '/'}}});
    router = createRouter(store);

    const push = createRouterAction(store)('push');
    assert.deepEqual(store.getActions(), []);

    push('/');

    assert.deepEqual(store.getActions(), [
      {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);
  });

  it('should call onLeave.', function(){
    // initialize store with dummy reducer
    store = configureStore([])({routing: {current: {pathname: '/', route: '/'}, next: {pathname: '/foo', route: '/foo'}}});
    router = createRouter(store);

    const onLeave = sandbox.spy();

    router.on('/', {
      render: sandbox.spy(),
      onLeave
    })

    const push = createRouterAction(store)('push');
    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);

    push('/foo');

    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
      {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/foo'}},
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/foo'}}
    ]);

    assert.equal(onLeave.calledOnce, true);
  });

  it('should dispatch REQUEST_LOCATION_CHANGE and delay LOCATION_CHANGE action until onEnter\'s callback called.', function(done){
    // initialize store with dummy reducer
    store = configureStore([])({routing: {next: {pathname: '/', route: '/'}}});
    router = createRouter(store);

    const onEnter = sandbox.spy(({}, cb) => {
      // before callback called.
      assert.deepEqual(store.getActions(), [
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
      ]);

      cb();

      // after callback called.
      assert.deepEqual(store.getActions(), [
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
      ]);

      done();
    });

    router.on('/', {
      render: sandbox.spy(),
      onEnter
    })

    const push = createRouterAction(store)('push');
    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);

    push('/');

    assert.equal(onEnter.calledOnce, true);
  });

  it('should dispatch REQUEST_LOCATION_CHANGE and LOCATION_CHANGE action if onEnter\'s callback not exists.', function(){
    // initialize store with dummy reducer
    store = configureStore([])({routing: {next: {pathname: '/', route: '/'}}});
    router = createRouter(store);

    const onEnter = sandbox.spy();

    router.on('/', {
      render: sandbox.spy(),
      onEnter
    })

    const push = createRouterAction(store)('push');
    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);

    push('/');

    // after callback called.
    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
      {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);

    assert.equal(onEnter.calledOnce, true)
  });

  it('should dispatch REQUEST_LOCATION_CHANGE and LOCATION_CHANGE_FAILURE and should call onError if error passed to cb.', function(done){
    // initialize store with dummy reducer
    store = configureStore([])({routing: {next: {pathname: '/', route: '/'}}});
    router = createRouter(store);

    const error = new Error('hoge');
    const onError = sandbox.spy();

    router.onError(onError);

    const onEnter = sandbox.spy(({}, cb) => {
      // before callback called.
      assert.deepEqual(store.getActions(), [
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
      ]);

      cb(error);

      // after callback called.
      assert.deepEqual(store.getActions(), [
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: LOCATION_CHANGE_FAILURE, payload: error}
      ]);
      assert.equal(onError.calledOnce, true);

      done();
    });

    router.on('/', {
      render: sandbox.spy(),
      onEnter
    })

    const push = createRouterAction(store)('push');
    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);

    push('/');

    assert.equal(onEnter.calledOnce, true)
  });

  it('should put warn message on LOCATION_CHANGE_FAILURE if no onError registered.', function(done){
    const wrappedConsole = sandbox.spy(console, 'warn');

    // initialize store with dummy reducer
    store = configureStore([])({routing: {next: {pathname: '/', route: '/'}}});
    router = createRouter(store);

    const onEnter = sandbox.spy(({}, cb) => {
      // before callback called.
      assert.deepEqual(store.getActions(), [
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
      ]);

      cb(false);

      // after callback called.
      assert.deepEqual(store.getActions(), [
        {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: REQUEST_LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}},
        {type: LOCATION_CHANGE_FAILURE, payload: false}
      ]);

      assert.equal(wrappedConsole.calledOnce, true);
      // should put warn message to console.
      assert.equal(wrappedConsole.calledWith(
        'You should register router.onError to handle this routing error. data =', false
      ), true);

      done();
    });

    router.on('/', {
      render: sandbox.spy(),
      onEnter
    })

    const push = createRouterAction(store)('push');
    assert.deepEqual(store.getActions(), [
      {type: LOCATION_CHANGE, payload: {via: 'push', pathname: '/'}}
    ]);

    push('/');

    assert.equal(onEnter.calledOnce, true)
  });
});
