import createLocation from 'lib/location.js';

import {
  getPathname,
  getSearch,
  parseLocation,
  stringifyLocation
} from 'lib/location.js';

describe('createLocation', function () {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    // starts with '/'
    window.history.pushState(null, null, '/');

    // spy history methods
    history.pushState = sandbox.spy(history, 'pushState');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return location', function () {
    const location = {
      pathname: '/hoge'
    };
    assert.deepEqual(createLocation(), { pathname: '/', search: '' });
  });

  it('should return location with custom history', function () {
    const customHistory = {
      location: {
        pathname: '/fuga',
        search: ''
      }
    }
    assert.deepEqual(createLocation(customHistory), { pathname: '/fuga', search: '' });
  });
});

describe('getPathname', function () {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    // starts with '/'
    window.history.pushState(null, null, '/');

    // spy history methods
    history.pushState = sandbox.spy(history, 'pushState');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return history.location.pathname if isUseCustomHistory is true', function () {
    const location = {
      pathname: '/hoge'
    }
    assert.equal(getPathname(location, true), '/hoge');
  });

  it('should return valid pathname if isUseCustomHistory is false', function () {
    const location = {
      href: '/'
    }
    assert.equal(getPathname(location, false), '/');
  });

  it('should return valid pathname if pathname contains query param', function () {
    const location = {
      href: '/?hoge=true'
    }
    assert.equal(getPathname(location, false), '/');
  });
});

describe('getSearch', function () {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    // starts with '/'
    window.history.pushState(null, null, '/');

    // spy history methods
    history.pushState = sandbox.spy(history, 'pushState');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return history.location.search if isUseCustomHistory is true', function () {
    const location = {
      search: '?hoge=true'
    }
    assert.equal(getSearch(location, true), 'hoge=true');
  });

  it('should return valid query if isUseCustomHistory is false', function () {
    const location = {
      search: ''
    }
    assert.equal(getSearch(location, false), '');
  });

  it('should return valid query if pathname contains query param', function () {
    const location = {
      search: '?hoge=true'
    }
    assert.equal(getSearch(location, false), 'hoge=true');
  });
});

describe('parseLocation', function () {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return location from string', function () {
    assert.deepEqual(parseLocation('/foo'), {pathname: '/foo', search: ''});
  });

  it('should return blank if string is blank', function () {
    assert.deepEqual(parseLocation('?'), {pathname: '', search: ''});
  });

  it('should return location from string with query', function () {
    assert.deepEqual(parseLocation('/?hoge=fuga'), {pathname: '/', search: 'hoge=fuga'});
  });
});

describe('stringifyLocation', function () {
  let sandbox;
  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should return string from location', function () {
    assert.deepEqual(stringifyLocation({pathname: '/foo'}), '/foo');
  });

  it('should return string from location with query string', function () {
    assert.deepEqual(stringifyLocation({pathname: '/foo', search: 'bar'}), '/foo?bar');
  });
});
