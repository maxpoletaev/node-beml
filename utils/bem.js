
module.exports = {

  /**
   * Add classes to element from bem selector.
   * @public
   *
   * @param {Object} $this
   * @param {Object} selector
   */
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

  /**
   * Build native string selector from bem selector.
   * @public
   *
   * @param {Object} selector
   * @return {String}
   */
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

/**
 * Default configuration.
 * @type {Object}
 * @private
 */
var config = {
  elemPrefix: '__',
  modPrefix: '_',
  modDlmtr: '_'
};

/**
 * Build block class name.
 * @private
 *
 * @param {String} blockName
 * @return {String}
 */
function buildBlockClass(blockName) {
  return blockName;
}

/**
 * Build element class name.
 * @private
 *
 * @param {String} blockClass
 * @param {String} elemName
 * @return {String}
 */
function buildElemClass(blockClass, elemName) {
  return blockClass + config.elemPrefix + elemName;
}

/**
 * Build modifier classname.
 * @private
 *
 * @param {String} baseClass
 * @param {String} modKey
 * @param {String} modVal
 * @return {String}
 */
function buildModClass(baseClass, modKey, modVal) {
  return baseClass + config.modPrefix + modKey + config.modDlmtr + modVal;
}
