import router from '/lib/router-redux.js';

describe('injectorCreator', function() {
  beforeEach(function(){
  });

  it('should export inject creator', function(){
    assert.equal(router(), 'sample');
  });
});
