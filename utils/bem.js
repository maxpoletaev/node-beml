module.exports = function(config, escaper) {
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

  function addClass($node, className) {
    if (!className) return;
    var currentValue = $node.attr('class').trim();
    if (~currentValue.indexOf(className)) return;
    if (currentValue.length > 0) currentValue += ' ';
    $node.attr('class', currentValue + className);
  }

  return {
    setClasses: function($this, selector) {
      var that = this;

      addClass($this, this.buildSelector({
        block: selector.block,
        elem: selector.elem
      }));

      if (selector.mod) {
        if (typeof selector.mod == 'string') {
          addClass($this, that.buildSelector({
            block: selector.block,
            elem: selector.elem,
            mod: selector.mod
          }));
        }
        else if (Array.isArray(selector.mod)) {
          selector.mod.forEach(function(mod) {
            addClass($this, that.buildSelector({
              block: selector.block,
              elem: selector.elem,
              mod: mod
            }));
          });
        }
        else {
          for (modKey in selector.mod) {
            var modVal = selector.mod[modKey];
            var mod = (modVal) ? modKey + ':' + modVal : modKey;

            addClass($this, this.buildSelector({
              block: selector.block,
              elem: selector.elem,
              mod: mod
            }));
          }
        }
      }
    },

    buildSelector: function(selector) {
      var result = null;

      if (selector.block) {
        result = buildBlockClass(selector.block);

        if (selector.elem) {
          result = buildElemClass(result, selector.elem);
        }

        if (selector.mod) {
          if (~selector.mod.indexOf(':')) {
            var mod = selector.mod.split(':');
            result = buildModClass(result, mod[0], mod[1])
          } else {
            result = buildModClass(result, selector.mod);
          }
        }
      }

      if (result) {
        if (escaper) {
          return escaper.decode(result);
        }
        return result;
      }

      return null;
    }
  };
};
