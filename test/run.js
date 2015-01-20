var fs = require('fs');
var beml = require('../');
var assert = require('assert');

var cases = fs.readdirSync('test/cases').filter(function(file) {
  return ~file.indexOf('.beml');
})
.map(function(file) {
  return file.replace('.beml', '');
});

cases.forEach(function(test) {
  var tmpl = fs.readFileSync('test/cases/' + test + '.beml');
  var result = fs.readFileSync('test/cases/' + test + '.html');

  it(test, function() {
    var html = beml(tmpl.toString());
    assert.equal(html, result+'');
  });
});
