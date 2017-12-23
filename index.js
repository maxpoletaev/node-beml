var cheerio = require('cheerio');
var BEML = require('./beml');
var util = require('util');

function run(html, config) {
  var $ = cheerio.load(html, {
    xmlMode: true,
    decodeEntities: false
  });

  var beml = new BEML(config);

  $('*').each(function() {
    var $this = $(this);
    beml.run($this);
  });

  return $.html();
}

run.process = util.deprecate(function(html, config) {
  return run(html, config);
}, '`beml.process()` is deprecated, use just `beml()`');

module.exports = run;
