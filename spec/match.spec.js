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

  it('should match even if path contains query string', function(){
    assert.equal(!!match('/', '/?sample=true'), true);
  });

  it('should match path syntax comparison', function(){
    assert.deepEqual(match('/user/:id', '/user/1'), { id: 1 });
  });

  it('should match path syntax comparison with string param', function(){
    assert.deepEqual(match('/user/:id', '/user/me'), { id: 'me' });
  });

  it('should return false when not matched', function(){
    assert.equal(!!match('/user/:id', '/user'), false);
  });

  it('should return false when not matched exactly', function(){
    assert.equal(!!match('/user/:id', '/user/'), false);
  });

  it('should match multiple path syntax comparison', function(){
    assert.deepEqual(match('/user/:id/comment/:commentId', '/user/1/comment/3'), {
      id: 1,
      commentId: 3
    });
  });
});
