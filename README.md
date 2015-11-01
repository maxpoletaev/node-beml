# BEML [![Build Status][build]][build-link]

[build]: https://travis-ci.org/zenwalker/node-beml.png?branch=master
[build-link]: https://travis-ci.org/zenwalker/node-beml

This is simple HTML preprocessor (or postprocessor) which extend HTML syntax for
comfortable working with bem html.

Also available plugins for [Gulp](https://github.com/zenwalker/gulp-beml),
[Grunt](https://github.com/zenwalker/grunt-beml) and [Broccoli](https://github.com/Inzephirum/broccoli-beml).

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
<div block="animals">
  <div block="unicorn"></div>
</div>
```

```html
<div class="animals">
  <div class="unicorn"></div>
</div>
```

### Elements

```html
<div block="animals">
  <div elem="item">
    <div elem="item-name"></div>
  </div>
</div>
```

```html
<div class="animals">
  <div class="animals__item">
    <div class="animals__item-name"></div>
  </div>
</div>
```

### Modifiers

```html
<div block="animals">
  <div block="unicorn" mod="size:large, female"></div>
</div>
```

```html
<div class="animals">
  <div class="unicorn inicorn_size_large unicorn_female"></div>
</div>
```

### Mixes

```html
<div block="animals">
  <div elem="item" mix="block:unicorn, mod: [large, female]">
    <div block="unicorn" elem="photo"></div>
    <div elem="item-name"></div>
  </div>
</div>
```

```html
<div class="animals">
  <div class="animals__item unicorn unicorn_large unicorn_female">
    <div class="unicorn__photo"></div>
    <div class="animals__item-name"></div>
  </div>
</div>
```

For complex values you can use pseudo JSON syntax:

```html
<div block="unicorn" mix="block:animals, elem:item, mod:{size:large,gender:female}"></div>
<div block="unicorn" mix="{block:b-mix-1}, {block:b-mix-2, mod:[mod1, mod2]}"></div>
```

```html
<div class="unicorn animals__item animals__item_size_large animals__item_gender_female"></div>
<div class="unicorn b-mix-1 b-mix-2 b-mix-2_mod1 b-mix-2_mod_2"></div>
```
