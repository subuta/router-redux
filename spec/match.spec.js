import match from '../lib/match.js';
import { pathToRegex } from '../lib/match.js';

describe('pathToRegex', function() {
  let sandbox;
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('should convert simple path to pattern string', function(){
    assert.deepEqual(pathToRegex('/'), /^\/$/);
  });

  it('should convert path to pattern string', function(){
    assert.deepEqual(pathToRegex('/user'), /^\/user$/);
  });

  it('should convert path syntax to pattern string', function(){
    assert.deepEqual(pathToRegex('/user/:id'), /^\/user\/([^/?]*\/?)$/);
  });

  it('should convert multiple path syntax to pattern string', function(){
    assert.deepEqual(pathToRegex('/user/:id/comment/:commentId'), /^\/user\/([^/?]*\/?)\/comment\/([^/?]*\/?)$/);
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

  it('should exact match path', function(){
    assert.equal(!!match('/', '/user'), false);
  });

  it('should ignore query string', function(){
    assert.equal(!!match('/', '/?sample=true'), true);
  });

  it('should ignore hash string', function(){
    assert.equal(!!match('/', '/#sample=true'), true);
  });

  it('should ignore complex hash string', function(){
    assert.equal(!!match('/login/callback', '/login/callback#access_token=test&id_token=test.test&token_type=Bearer'), true);
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
