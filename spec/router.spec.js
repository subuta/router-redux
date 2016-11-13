import { createStore } from 'redux/dist/redux.js';
import routerCreator, {
  findRouteKeyByPath,
  getRoutes
} from 'lib/router.js';

describe('routerCreator', function () {
  let sandbox;
  let store;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {});
  });

  it('should create router', function () {
    const router = routerCreator(store)
    assert.deepEqual(getRoutes(), {});
    assert.equal(typeof router.on, 'function');
    assert.equal(typeof router.render, 'function');
  });
});

describe('router.on', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {});
    router = routerCreator(store);
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
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {
      current: {
        path: '/',
        route: '/',
        params: {},
        query: ''
      }
    });
    router = routerCreator(store);
  });

  it('should return correct route', function () {
    const render = sandbox.spy(() => true);
    router.on('/', render)

    const result = router.render();

    assert.equal(render.called, true);
    assert.equal(result, true)
  });

  it('should return correct route even if path contains path syntax', function () {
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {
      current: {
        path: '/1',
        route: '/',
        params: {},
        query: ''
      }
    });
    router = routerCreator(store);

    const render = sandbox.spy(() => true);
    router.on('/:id', render)

    const result = router.render();

    assert.equal(render.called, true);
    assert.equal(result, true)
  });
});

describe('findRouteKeyByPath', function () {
  let sandbox;
  let store;
  let router;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {
      current: {
        path: '/',
        route: '/',
        params: {},
        query: ''
      }
    });
    router = routerCreator(store);
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
