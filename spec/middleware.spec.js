import { createStore } from 'redux';
import middleware from 'lib/middleware.js';

describe('middleware', function() {
  let sandbox;
  let store;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    // initialize store with dummy reducer
    store = createStore((state, action) => state, {}, middleware);
  });


});
