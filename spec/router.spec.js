import {
  ROUTE_CHANGE,
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

  it('should dispatch routeChange action on initial page load', function(done){
    routerCreator(store);
    assert.equal(store.dispatch.called, false);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.called, true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(transformLocationToPath(location))
      }), true);
      done();
    });
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
