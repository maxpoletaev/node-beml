module.exports = {

  config: {
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '_'
  },

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
      result = this._buildBlockClass(selector.block);

      if (selector.elem !== undefined) {
        result = this._buildElemClass(result, selector.elem);
      }

      if (selector.mod !== undefined) {
        var mod = selector.mod.split(':');
        result = this._buildModClass(result, mod[0], mod[1]);
      }
    }

    return result? result : selector;
  },

  _buildBlockClass: function(blockName) {
    return blockName;
  },

  _buildElemClass: function(blockClass, elemName) {
    return blockClass + this.config.elemPrefix + elemName;
  },

  _buildModClass: function(baseClass, modKey, modVal) {
    return baseClass + this.config.modPrefix + modKey + this.config.modDlmtr + modVal;
  }

};
