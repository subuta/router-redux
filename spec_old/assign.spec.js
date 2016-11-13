// borrowed and modified from https://github.com/sindresorhus/object-assign

Object.assign = undefined;
const assign = require('lib/assign.js').default;

it('should have the correct length', function () {
  assert.equal(assign.length, 2);
});

it('should throw when target is not an object', function () {
  assert.throws(function () {
    assign(null);
  }, TypeError);
  assert.throws(function () {
    assign(undefined);
  }, TypeError);
});

it('should assign own enumerable properties from source to target object', function () {
  assert.deepEqual(assign({foo: 0}, {bar: 1}), {
    foo: 0,
    bar: 1
  });
  assert.deepEqual(assign({foo: 0}, null, undefined), {foo: 0});
  assert.deepEqual(assign({foo: 0}, null, undefined, {bar: 1}, null), {
    foo: 0,
    bar: 1
  });
});

it('should throw on null/undefined target', function () {
  assert.throws(function () {
    assign(null, {});
  });

  assert.throws(function () {
    assign(undefined, {});
  });

  assert.throws(function () {
    assign(undefined, undefined);
  });
});

it('should not throw on null/undefined sources', function () {
  assert.doesNotThrow(function () {
    assign({}, null);
  });

  assert.doesNotThrow(function () {
    assign({}, undefined);
  });

  assert.doesNotThrow(function () {
    assign({}, undefined, null);
  });
});

it('should support multiple sources', function () {
  assert.deepEqual(assign({foo: 0}, {bar: 1}, {bar: 2}), {
    foo: 0,
    bar: 2
  });
  assert.deepEqual(assign({}, {}, {foo: 1}), {foo: 1});
});

it('should only iterate own keys', function () {
  var Unicorn = function () {};
  Unicorn.prototype.rainbows = 'many';
  var unicorn = new Unicorn();
  unicorn.bar = 1;

  assert.deepEqual(assign({foo: 1}, unicorn), {
    foo: 1,
    bar: 1
  });
});

it('should return the modified target object', function () {
  var target = {};
  var returned = assign(target, {a: 1});
  assert.equal(returned, target);
});

it('should support `Object.create(null)` objects', function () {
  var obj = Object.create(null);
  obj.foo = true;
  assert.deepEqual(assign({}, obj), {foo: true});
});

it('should preserve property order', function () {
  var letters = 'abcdefghijklmnopqrst';
  var source = {};
  letters.split('').forEach(function (letter) {
    source[letter] = letter;
  });
  var target = assign({}, source);
  assert.equal(Object.keys(target).join(''), letters);
});

it('should accept primitives as target', function () {
  var target = assign('abcdefg', {foo: 'bar'});
  var strObj = Object('abcdefg');
  strObj.foo = 'bar';
  assert.deepEqual(target, strObj);
});

if (typeof Symbol !== 'undefined') {
  it('should support symbol properties', function () {
    var target = {};
    var source = {};
    var sym = Symbol('foo');
    source[sym] = 'bar';
    assign(target, source);
    assert.equal(target[sym], 'bar');
  });

  it('should only copy enumerable symbols', function () {
    var target = {};
    var source = {};
    var sym = Symbol('foo');
    Object.defineProperty(source, sym, {
      enumerable: false,
      value: 'bar'
    });
    assign(target, source);
    assert.equal(target[sym], undefined);
  });
}
