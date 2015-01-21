# BEML [![Build Status][build]][build-link]

[build]: https://travis-ci.org/zenwalker/node-beml.png?branch=master
[build-link]: https://travis-ci.org/zenwalker/node-beml

This is simple HTML preprocessor (or postprocessor) which extend HTML syntax for
comfortable working with bem html.

## Why?

Raw HTML in BEM style is difficult to read. Also, I (and not only I) like HTML
and don't want to use BEMHTML, BEMJSON and others specific technologies.

## Targets

* Maximum simplicity - HTML syntax, without translate from another language.
* Possibility port to other languages (e.g. PHP or Python).
* Joint work with template engines.
* Ease of use.

## Sample

```html
<div block="b-animals">
  <div elem="cat" mod="size:big, color:red"></div>
</div>
```

translated to

```html
<div class="b-animals">
  <div class="b-animals__cat b-animals__cat_size_big b-animals__cat_color_red"></div>
</div>
```

## How to use

```javascript
var beml = require('beml');

var config = {
  elemPrefix: '__',
  modPrefix: '_',
  modDlmtr: '_'
};

var html = beml('<div block="b-block" mod="size:big"></div>', config);
console.log(html);
```

## Syntax reference

### Blocks

```html
<div block="b-animal"></div>
```

### Elements

```html
<div elem="name"></div>                  <!-- element of parent block -->
<div block="b-animal" elem="name"></div> <!-- element of specific block -->
```

### Modifiers

```html
<div block="b-block" mod="size:big, color:red"></div>
```

### Mixes

```html
<div block="b-block" mix="block:b-mix, elem:elem"></div>
```

For complex values you can use pseudo JSON syntax:

```html
<div block="b-block" mix="{block:b-mix, mod:{ mod1:val1, mod2:val2 }}"></div>
<div block="b-block" mix="{block:b-mix-1},{block:b-mix-2}"></div>
```
