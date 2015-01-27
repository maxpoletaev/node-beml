var ajson = require('../../utils/ajson');
var assert = require('assert');

describe('Parsing JSON', function() {

  it('short version', function() {
    var test = 'key: val, key2: val2, key3: [a, b, c]';
    var result = {key: 'val', key2: 'val2', key3: ['a', 'b', 'c']};

    assert.deepEqual(ajson.parse(test), result);
  });

  it('full version', function() {
    var test = '{key: val, key2: val2, key3: [a, b, c]}';
    var result = {key: 'val', key2: 'val2', key3: ['a', 'b', 'c']};

    assert.deepEqual(ajson.parse(test), result);
  });

});
