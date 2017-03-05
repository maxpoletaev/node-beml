var escaping = require('../../utils/escaping');
var assert = require('assert');

var euc = encodeURI, duc = decodeURI;

describe('TemplateTagsEscaper', function() {
  var escaper = new escaping.TemplateTagsEscaper('{{', '}}');

  it('encode', function() {
    var result = escaper.encode('b-block b-block_a_{{ mod_a }} b-block_b_{{ mod_b }}');
    var expected = 'b-block b-block_a_' + euc('{{ mod_a }}') + ' b-block_b_' + euc('{{ mod_b }}');
    assert.equal(result, expected);
  });

  it('decode', function() {
    var result = escaper.decode('b-block b-block_a_' + euc('{{ mod_a }}') + ' b-block_b_' + euc('{{ mod_b }}'));
    var expected = 'b-block b-block_a_{{ mod_a }} b-block_b_{{ mod_b }}';
    assert.equal(result, expected);
  });
});
