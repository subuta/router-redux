import {
  ROUTE_CHANGE,
  ROUTE_ERROR,
  INITIAL_ROUTE_RESOLVED,
  transformLocationToPath,
  getQuery
} from 'lib/actions.js';

import routerCreator, {
  getRoutes,
  getHistory,
  createRoute
} from 'lib/router.js';

describe('routerCreator', function() {

  let store;
  let sandbox;
  let clock;
  let routerHistory;
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
      payload: createRoute(location.pathname)
    }), true);
  });

  it('should dispatch routeChange action on initial page loa', function(done){
    routerCreator(store);
    assert.equal(store.dispatch.called, false);

    requestAnimationFrame(() => {
      assert.equal(store.dispatch.called, true);
      assert.equal(store.dispatch.calledWith({
        type: ROUTE_CHANGE,
        payload: createRoute(location.pathname)
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

  let router;
  let location;

  beforeEach(function(){
    history.pushState(null, null, '/');
    router = routerCreator({});
    location = getHistory().getLocation()
  });

  it('should create route object', function(){
    assert.deepEqual(createRoute(location.pathname), {
      path: '/',
      route: null,
      params: null,
      query: ''
    });
  });

  it('should create route object with query param', function(){
    history.pushState(null, null, '/sample?hoge=true&fuga=true');
    location = getHistory().getLocation()
    assert.deepEqual(createRoute(location.pathname, location.search), {
      path: '/sample',
      route: null,
      params: null,
      query: 'hoge=true&fuga=true'
    });
  });
});
