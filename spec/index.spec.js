import index from 'lib/index.js';

describe('index', function() {
  it('should create routeChange action', function(){
    assert.deepEqual(index, 'test')
  });
});
