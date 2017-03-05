var extend = require('extend');
var ajson = require('./utils/ajson');
var escaping = require('./utils/escaping');

function BEML(config) {
  this.config = extend({
    elemPrefix: '__',
    modPrefix: '_',
    modDlmtr: '_',
    escapeTemplateTags: ['{{', '}}']
  }, config || {});

  if (this.config.escapeTemplateTags) {
    this.escaper = new escaping.TemplateTagsEscaper(
      this.config.escapeTemplateTags[0],
      this.config.escapeTemplateTags[1]);
  }

  this.bem = require('./utils/bem')(this.config, this.escaper);
}

BEML.prototype.run = function($node) {

  /**
   * Block processing.
   */

  if ($node.attr('block') !== undefined) {
    var block = this.bem.buildSelector({
      block: $node.attr('block')
    });

    $node.data('block', $node.attr('block'));
    $node.removeAttr('block');

    if (!$node.attr('elem')) {
      $node.addClass(block);
    }
  }
  else {
    if ($node.parent()) {
      var block = $node.parent().data('block');
      $node.data('block', block);
    }
  }

  /**
   * Element processing.
   */

  if ($node.attr('elem') !== undefined) {
    var elem = this.bem.buildSelector({
      block: $node.data('block'),
      elem: $node.attr('elem')
    });

    $node.data('elem', $node.attr('elem'));
    $node.removeAttr('elem');
    $node.addClass(elem);
  }

  /**
   * Modifier processing.
   */

  if ($node.attr('mod') !== undefined) {
    var modAttr = this.escapeTemplateTags($node.attr('mod'));
    mods = ajson.parse(modAttr);

    this.bem.setClasses($node, {
      block: $node.data('block'),
      elem: $node.data('elem'),
      mod: mods
    });

    $node.data('mod', $node.attr('mod'));
    $node.removeAttr('mod');
  }

  /**
   * Mix processing.
   */

  if ($node.attr('mix') !== undefined) {
    var mixAttr = this.escapeTemplateTags($node.attr('mix'));
    var mixes = ajson.parse(mixAttr);

    if (Array.isArray(mixes)) {
      var that = this;
      mixes.forEach(function(mix) {
        that.bem.setClasses($node, mix);
      });
    } else {
      this.bem.setClasses($node, mixes);
    }

    $node.removeAttr('mix');
  }

  $node[0].attribs = sortAttrs($node[0].attribs);
};

BEML.prototype.escapeTemplateTags = function(value) {
  if (this.escaper) {
    return this.escaper.encode(value);
  }
  return value;
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

module.exports = BEML;
