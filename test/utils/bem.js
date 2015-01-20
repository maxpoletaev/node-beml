var bem = require('../../utils/bem')();
var assert = require('assert');

describe('Building selector', function() {

  it('for block', function() {
    var test = bem.buildSelector({ block: 'b-block' });
    var result = 'b-block';

    assert.equal(test, result);
  });

  it('for element', function() {
    var test = bem.buildSelector({ block: 'b-block', elem: 'elem' });
    var result = 'b-block__elem';

    assert.equal(test, result);
  });

  it('for block modifier', function() {
    var test = bem.buildSelector({ block: 'b-block', mod: 'key:val' });
    var result = 'b-block_key_val';

    assert.equal(test, result);
  });

  it('for element modifier', function() {
    var test = bem.buildSelector({ block: 'b-block', elem: 'elem', mod: 'key:val' });
    var result = 'b-block__elem_key_val';

    assert.equal(test, result);
  });

});
