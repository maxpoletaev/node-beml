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
    var className = baseClass + config.modPrefix + modKey;
    if (modVal) className += config.modDlmtr + modVal;
    return className;
  }

  return {
    setClasses: function($this, selector) {
      var that = this;

      $this.addClass(this.buildSelector({
        block: selector.block,
        elem: selector.elem
      }));

      if (selector.mod !== undefined) {
        if (typeof selector.mod == 'string') {
          $this.addClass(that.buildSelector({
            block: selector.block,
            elem: selector.elem,
            mod: selector.mod
          }));
        }
        else if (Array.isArray(selector.mod)) {
          selector.mod.forEach(function(mod) {
            $this.addClass(that.buildSelector({
              block: selector.block,
              elem: selector.elem,
              mod: mod
            }));
          });
        }
        else {
          for (modKey in selector.mod) {
            var modVal = selector.mod[modKey];

            $this.addClass(this.buildSelector({
              block: selector.block,
              elem: selector.elem,
              mod: modKey+':'+modVal
            }));
          }
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
          if (~selector.mod.indexOf(':')) {
            var mod = selector.mod.split(':');
            result = buildModClass(result, mod[0], mod[1])
          } else {
            result = buildModClass(result, selector.mod);
          }
        }
      }

      return result? result : selector;
    }
  };
};
