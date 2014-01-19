module.exports = {

	parse: function(string) {
		var output = string.replace(/([a-z0-9-]+)/ig, '"$1"');
		output = (/^{/.test(output))? output : '{' + output + '}';

		return JSON.parse(output);
	}

};
