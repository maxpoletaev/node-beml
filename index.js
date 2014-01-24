var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

module.exports = {

  process: function(html, callback) {
    var processors = fs.readdirSync(path.resolve(__dirname, 'processors'));
    var $ = cheerio.load(html);

    for (var i in processors) {
      var processor = require(path.resolve(__dirname, 'processors/' + processors[i]));

      $('*').each(function() {
        processor( $(this) );
      });

      if (i == processors.length-1) {
        if (typeof callback == 'function') {
          // @deprecated
          callback(null, $.html());
        }
        return $.html();
      }
    }
  }

};
