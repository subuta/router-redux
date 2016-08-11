import {
  ROUTE_CHANGE,
  INITIAL_ROUTE_RESOLVED
} from 'lib/actions.js';

import routerCreator, {
  getRoutes
} from 'lib/router.js';

import {transformToPath} from 'lib/reducer.js';

describe('routerCreator', function() {

  let store;
  let sandbox;
  let clock;
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
    clock = sandbox.useFakeTimers();
    store = {
      getState: sandbox.spy(() => {
        return {
          routing: {
            current: transformToPath(location)
          }
        }
      }),
      dispatch: sandbox.spy(() => {})
    };

    // starts with '/'
    history.pushState(null, null, '/');

    window.addEventListener = sandbox.spy(window, 'addEventListener');
    window.removeEventListener = sandbox.spy(window, 'removeEventListener');
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should register popState on creation', function(){
    const router = routerCreator(store);
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
    const router = routerCreator(store);
    assert.equal(store.dispatch.called, false);

    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);

    assert.equal(store.dispatch.called, true);
    assert.equal(store.dispatch.calledWith({
      type: ROUTE_CHANGE,
      payload: location
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

  it('onEnter should add routes and call route once if currentPath matched', function(){
    const router = routerCreator(store);
    const onEnter = sinon.spy((state, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: transformToPath(location)
        }
      });

      setTimeout(() => {
        cb();
      }, 3000);
    });

    assert.equal(store.dispatch.called, false);

    router.onEnter('/', onEnter);

    clock.tick(2999);
    assert.equal(store.dispatch.called, false); // should wait for callback called.

    clock.tick(1);

    assert.equal(store.dispatch.called, true);
    assert.equal(store.dispatch.calledWith({
      type: INITIAL_ROUTE_RESOLVED,
      payload: location
    }), true);
    assert.equal(onEnter.called, true);
  });

  it('should not dispatch initialRouteResolved action if router\'s onEnter argument omitted.', function(){
    const router = routerCreator(store);
    const onEnter = sinon.spy((state) => {
      assert.deepEqual(state, {
        routing: {
          current: transformToPath(location)
        }
      });
    });

    router.onEnter('/', onEnter);
    assert.equal(store.dispatch.called, false);
    assert.equal(onEnter.called, true);
  });

  it('should not dispatch initialRouteResolved action if router\'s onEnter not calls callback.', function(){
    const router = routerCreator(store);
    const onEnter = sinon.spy((state, cb) => {
      assert.deepEqual(state, {
        routing: {
          current: transformToPath(location)
        }
      });
    });

    router.onEnter('/', onEnter);
    assert.equal(store.dispatch.called, false);
    assert.equal(onEnter.called, true);
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
