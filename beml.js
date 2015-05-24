var ajson = require('./utils/ajson');

function BEML(config) {
  this.bem = require('./utils/bem')(config);
}

function sortAttrs(attrs) {
  if (attrs.class) {
    var newAttrs = {
      class: attrs.class
    };

    for (key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        if (key != 'class') newAttrs[key] = attrs[key];
      }
    }

    return newAttrs;
  }

  return attrs;
}

BEML.prototype.run = function($this) {

  /**
   * Block processing.
   */

  if ($this.attr('block') !== undefined) {
    var block = this.bem.buildSelector({
      block: $this.attr('block')
    });

    $this.data('block', $this.attr('block'));
    $this.removeAttr('block');

    if (!$this.attr('elem')) {
      $this.addClass(block);
    }
  }
  else {
    if ($this.parent()) {
      var block = $this.parent().data('block');
      $this.data('block', block);
    }
  }

  /**
   * Element processing.
   */

  if ($this.attr('elem') !== undefined) {
    var elem = this.bem.buildSelector({
      block: $this.data('block'),
      elem: $this.attr('elem')
    });

    $this.data('elem', $this.attr('elem'));
    $this.removeAttr('elem');
    $this.addClass(elem);
  }

  /**
   * Modifier processing.
   */

  if ($this.attr('mod') !== undefined) {
    this.bem.setClasses($this, {
      block: $this.data('block'),
      elem: $this.data('elem'),
      mod: ajson.parse($this.attr('mod'))
    });

    $this.data('mod', $this.attr('mod'));
    $this.removeAttr('mod');
  }

  /**
   * Mix processing.
   */

  if ($this.attr('mix') !== undefined) {
    var mixes = ajson.parse($this.attr('mix'));

    if (Array.isArray(mixes)) {
      var that = this;
      mixes.forEach(function(mix) {
        that.bem.setClasses($this, mix);
      });
    } else {
      this.bem.setClasses($this, mixes);
    }

    $this.removeAttr('mix');
  }

  $this[0].attribs = sortAttrs($this[0].attribs);

};

module.exports = BEML;
