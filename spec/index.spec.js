import createRouter from 'lib/index.js';
import {
  routerMiddleware,
  routerReducer,
  getCurrent,
  getLast,
  getNext,
  getRouteError,
  getIsLoading,
  push,
  replace,
  go,
  back,
  forward
} from 'lib/index.js';

describe('index', function() {
  it('should export things correctly', function(){
    assert.equal(typeof createRouter === 'function', true);
    assert.equal(typeof routerMiddleware === 'function', true);
    assert.equal(typeof routerReducer === 'function', true);
    assert.equal(typeof getCurrent === 'function', true);
    assert.equal(typeof getLast === 'function', true);
    assert.equal(typeof getNext === 'function', true);
    assert.equal(typeof getRouteError === 'function', true);
    assert.equal(typeof getIsLoading === 'function', true);
    assert.equal(typeof push === 'function', true);
    assert.equal(typeof replace === 'function', true);
    assert.equal(typeof go === 'function', true);
    assert.equal(typeof back === 'function', true);
    assert.equal(typeof forward === 'function', true);
  });
});
