var extend = require('extend');

module.exports = function(config) {

  var config = extend({
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '_'
  }, config || {});

  function buildBlockClass(blockName) {
    return blockName;
  }

  function buildElemClass(blockClass, elemName) {
    return blockClass + config.elemPrefix + elemName;
  }

  function buildModClass(baseClass, modKey, modVal) {
    return baseClass + config.modPrefix + modKey + config.modDlmtr + modVal;
  }

  return {
    setClasses: function($this, selector) {
      $this.addClass(this.buildSelector({
        block: selector.block,
        elem: selector.elem
      }));

      if (selector.mod !== undefined) {
        for (modKey in selector.mod) {
          var modVal = selector.mod[modKey];

          $this.addClass(this.buildSelector({
            block: selector.block,
            elem: selector.elem,
            mod: modKey+':'+modVal
          }));
        }
      }
    },

    buildSelector: function(selector) {
      var result = null;

      if (selector.block !== undefined) {
        result = buildBlockClass(selector.block);

        if (selector.elem !== undefined) {
          result = buildElemClass(result, selector.elem);
        }

        if (selector.mod !== undefined) {
          var mod = selector.mod.split(':');
          result = buildModClass(result, mod[0], mod[1]);
        }
      }

      return result? result : selector;
    }
  };
};
