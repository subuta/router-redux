import createHistory from 'lib/history.js';

import {
  push,
  replace,
  listen
} from 'lib/history.js';

describe('push', function () {
  var sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should call history.push if defined', function () {
    const history = {
      push: sandbox.spy()
    }
    push(history)('/')
    assert.equal(history.push.called, true);
    assert.equal(history.push.calledWith('/'), true);
  });

  it('should call history.pushState if history.push not defined', function () {
    const history = {
      pushState: sandbox.spy()
    }
    push(history)('/')
    assert.equal(history.pushState.called, true);
    assert.equal(history.pushState.calledWith(null, null, '/'), true);
  });
});

describe('replace', function () {
  var sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should call history.replace if defined', function () {
    const history = {
      replace: sandbox.spy()
    }
    replace(history)('/')
    assert.equal(history.replace.called, true);
    assert.equal(history.replace.calledWith('/'), true);
  });

  it('should call history.replaceState if history.replace not defined', function () {
    const history = {
      replaceState: sandbox.spy()
    }
    replace(history)('/')
    assert.equal(history.replaceState.called, true);
    assert.equal(history.replaceState.calledWith(null, null, '/'), true);
  });
});

describe('listen', function () {
  var sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should call history.listen if defined', function () {
    const fn = sinon.spy();
    const history = {
      listen: sandbox.spy()
    }

    listen(history)(fn)

    assert.equal(history.listen.called, true);
    assert.equal(history.listen.calledWith(fn), true);
  });

  it('should call window.addEventListener/removeEventListener with "popstate" event if history.listen not defined', function () {
    window.addEventListener = sandbox.spy(window, 'addEventListener');
    window.removeEventListener = sandbox.spy(window, 'removeEventListener');
    const fn = sinon.spy(() => {});

    const unListen = listen({})(fn);

    assert.equal(window.addEventListener.called, true);
    assert.equal(window.addEventListener.firstCall.args[0], 'popstate');

    unListen();

    assert.equal(window.removeEventListener.called, true);
    assert.equal(window.removeEventListener.firstCall.args[0], 'popstate');
  });

  it('should call listener on popstate', function () {
    const fn = sinon.spy(() => {});
    const unListen = listen({})(fn);

    history.pushState(null, null, '/');
    const popStateEvent = new PopStateEvent('popstate');

    assert.equal(fn.calledOnce, false);
    window.dispatchEvent(popStateEvent);
    assert.equal(fn.calledOnce, true);

    unListen();

    // should not dispatch event.
    assert.equal(fn.calledOnce, true);
    window.dispatchEvent(popStateEvent);
    assert.equal(fn.calledOnce, true);
  });
});

describe('createHistory', function () {
  var sandbox;
  beforeEach(function () {
    // starts with '/'
    history.pushState(null, null, '/');

    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return push that use passed history', function () {
    const history = {
      push: sandbox.spy()
    }

    const instance = createHistory(history);
    instance.push('/')

    assert.equal(history.push.called, true);
    assert.equal(history.push.calledWith('/'), true);
  });

  it('should return push that use window.history if history not passed', function () {
    window.history.pushState = sandbox.spy(window.history, 'pushState');

    const instance = createHistory();
    instance.push('/')

    assert.equal(window.history.pushState.called, true);
    assert.equal(window.history.pushState.calledWith(null, null, '/'), true);
  });

  it('should return module that has original history API', function () {
    const instance = createHistory();
    const location = instance.getLocation();

    assert.equal(typeof instance.push, 'function');
    assert.equal(typeof instance.replace, 'function');
    assert.equal(typeof instance.listen, 'function');
    assert.equal(typeof instance.go, 'function');
    assert.equal(typeof instance.back, 'function');
    assert.equal(typeof instance.forward, 'function');
    assert.equal(typeof instance.getLocation, 'function');
    assert.equal(typeof location, 'object');

    assert.equal(location.pathname, '/');
    assert.equal(location.search, '');
  });
});

