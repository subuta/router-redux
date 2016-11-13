import configureStore from 'redux-mock-store';
import createRouter, {
  findRouteKeyByPath,
  enrichLocation,
  getRoutes,
  getHistory
} from 'lib/router.js';

import createLocation from 'lib/location.js';

import {
  LOCATION_CHANGE
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
    assert.equal(typeof router.render, 'function');
    assert.equal(typeof router.destroy, 'function');
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

    // should throw error with mockedStore
    try {
      router.render()
    } catch(e) {
      // should call location change.
      assert.deepEqual(store.getActions(), [{type: LOCATION_CHANGE, payload: {pathname: '/', search: '', route: '/', params: {}}}])
      // ensure render uses latest state.
      assert.equal(store.getState.called, true);
    }
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

  it('should call store\'s unsubscribe', function () {
    store = configureStore([])({});
    const unsubscribe = sandbox.spy();
    store.subscribe = sandbox.spy(() => unsubscribe);

    router = createRouter(store);
    router.destroy();

    assert.equal(store.subscribe.called, true);
    assert.equal(unsubscribe.called, true);
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
