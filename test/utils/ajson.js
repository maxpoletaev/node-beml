var ajson = require('../../utils/ajson');
var assert = require('assert');

describe('Parsing', function() {
	
	it('short version', function() {
		var test = 'key: val, key2: val2';
		var result = {key: 'val', key2: 'val2'};

		assert.deepEqual(ajson.parse(test), result);
	});

	it('full version', function() {
		var test = '{key: val, key2: val2}';
		var result = {key: 'val', key2: 'val2'};

		assert.deepEqual(ajson.parse(test), result);
	});
	
});
