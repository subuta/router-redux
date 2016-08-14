import match, {
  pathToRegex
} from 'lib/match.js';

describe('pathToRegex', function() {
  let sandbox;
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should convert path to pattern string', function(){
    assert.deepEqual(pathToRegex('/user'), /\/user/);
  });

  it('should convert path syntax to pattern string', function(){
    assert.deepEqual(pathToRegex('/user/:id'), /\/user\/([^\/?]*\/?)/);
  });

  it('should convert multiple path syntax to pattern string', function(){
    assert.deepEqual(pathToRegex('/user/:id/comment/:commentId'), /\/user\/([^\/?]*\/?)\/comment\/([^\/?]*\/?)/);
  });
});

describe('match', function() {
  let sandbox;
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should match simple path comparison', function(){
    assert.equal(!!match('/', '/'), true);
  });

  it('should match path syntax comparison', function(){
    assert.equal(!!match('/user/:id', '/user/1'), true);
  });
});
