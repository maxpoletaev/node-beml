module.exports = {

  /**
   * Convert pseudo JSON to object.
   * @public
   *
   * @param {String} input
   * @return {*}
   */
  parse: function(input) {

    if (~input.indexOf('{') || ~input.indexOf('[')) {
      var output = input.replace(/([a-z0-9-]+)/ig, '"$1"');
      var reArray = new RegExp('}[ ]*,[ ]*{');
      var reObject = new RegExp('^{');

      if (!reObject.test(output)) {
        output = '{' + output + '}';
      }

      if (reArray.test(output)) {
        output = '[' + output + ']'
      }

      return JSON.parse(output);
    }
    else {
      output = {};

      input.split(',').forEach(function(sect) {
        var kv = sect.split(':');
        output[kv[0].trim()] = (kv.length > 1) ? kv[1].trim() : undefined;
      });

      return output;
    }

  }

};
