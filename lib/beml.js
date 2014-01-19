var dom = require('jsdom');
var vow = require('vow');
var fs = require('fs');

module.exports = {

	process: function(html, callback) {		
		return this._parse(html).then(
			function(html) {
				callback(null, html);
			},
			function(err) {
				callback(err);
			}
		);
	},

	_parse: function(html) {
		var defer = vow.defer();
		dom.env(html, [], function(err, window) {
			if (err) {
				return defer.reject(err);
			}

			var processors = fs.readdirSync('processors');
			var $ = require('jquery')(window);

			for (var i in processors) {
				var processor = require('../processors/' + processors[i]);
				
				$('*').each(function() {
					var $this = $(this);
					processor($this);
				});

				if (i == processors.length-1) {
					defer.resolve(window.document.innerHTML);
				}
			}
		});
		return defer.promise();
	}

}
