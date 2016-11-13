import {
  push
} from 'lib/actions.js';

describe('actions', function() {
  beforeEach(function(){
    history.pushState(null, null, '/');
  });

  it('should create push action', function(){
    assert.deepEqual(push('/'), {
      type: '@@router-redux/REQUEST_LOCATION_CHANGE',
      payload: {
        via: 'push',
        pathname: '/'
      }
    });
  });
});
