var bem = require('../utils/bem');
var ajson = require('../utils/ajson');

module.exports = function($this) {

	// Block processing
	if ($this.attr('block') !== undefined) {
		var block = bem.buildSelector({
			block: $this.attr('block')
		});

		$this.data('block', $this.attr('block'));
		$this.removeAttr('block');

		if ($this.attr('elem') == undefined) {
			$this.addClass(block);
		}
	}
	else {
		if ($this.parent()) {
			var block = $this.parent().data('block');
			$this.data('block', block);
		}
	}

	// Element processing
	if ($this.attr('elem') !== undefined) {
		var elem = bem.buildSelector({
			block: $this.data('block'),
			elem: $this.attr('elem')
		});

		$this.data('elem', $this.attr('elem'));
		$this.removeAttr('elem');
		$this.addClass(elem);
	}
	else {
		if ($this.parent()) {
			var elem = $this.parent().data('elem');
			$this.data('elem', elem);
		}
	}

	// Modifier processing
	if ($this.attr('mod') !== undefined) {
		bem.setClasses($this, {
			block: $this.data('block'),
			elem: $this.data('elem'),
			mod: ajson($this.attr('mod'))
		});

		$this.data('mod', $this.attr('mod'));
		$this.removeAttr('mod');
	}

	// Mix processing
	if ($this.attr('mix') !== undefined) {
		var mix = ajson($this.attr('mix'));
		bem.setClasses($this, mix);
		$this.removeAttr('mix');
	}

}
