import {
  pop,
  push,
  replace,
  go,
  back,
  forward,
  locationChange,
  locationChangeFailure
} from 'lib/actions.js';

describe('actions', function() {
  it('should create push action', function(){
    assert.deepEqual(pop('/'), {
      type: '@@router-redux/REQUEST_LOCATION_CHANGE',
      payload: {
        via: 'pop',
        pathname: '/'
      }
    });
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

  it('should create replace action', function(){
    assert.deepEqual(replace('/'), {
      type: '@@router-redux/REQUEST_LOCATION_CHANGE',
      payload: {
        via: 'replace',
        pathname: '/'
      }
    });
  });

  it('should create go action', function(){
    assert.deepEqual(go(1), {
      type: '@@router-redux/REQUEST_LOCATION_CHANGE',
      payload: {
        via: 'go',
        point: 1
      }
    });
  });

  it('should create back action', function(){
    assert.deepEqual(back(), {
      type: '@@router-redux/REQUEST_LOCATION_CHANGE',
      payload: {
        via: 'back'
      }
    });
  });

  it('should create forward action', function(){
    assert.deepEqual(forward(), {
      type: '@@router-redux/REQUEST_LOCATION_CHANGE',
      payload: {
        via: 'forward'
      }
    });
  });

  it('should create location change action', function(){
    const pathname = '/'
    assert.deepEqual(locationChange(pathname), {
      type: '@@router-redux/LOCATION_CHANGE',
      payload: {
        via: 'push',
        pathname
      }
    });
  });

  it('should create location change failure action', function(){
    const err = new Error();
    assert.deepEqual(locationChangeFailure(err), {
      type: '@@router-redux/LOCATION_CHANGE_FAILURE',
      payload: err
    });
  });
});
