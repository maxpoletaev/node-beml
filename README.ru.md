# BEML [![Build Status][build]][build-link]

[build]: https://travis-ci.org/zenwalker/node-beml.png?branch=master
[build-link]: https://travis-ci.org/zenwalker/node-beml

Это небольшой HTML-препроцессор или постпроцессор, облегчающий написание BEM-разметки, путем расширения HTML синтаксиса.

Также доступны плагины для [Gulp](https://github.com/zenwalker/gulp-beml),
[Grunt](https://github.com/zenwalker/grunt-beml), [Broccoli](https://github.com/Inzephirum/broccoli-beml) и [Postxml](https://github.com/postxml/postxml-beml).

## Зачем?

Чистый HTML в BEM-стиле довльно сложен для чтения. Так же я (да и не только я)
люблю HTML и не считаю необходимым использовать BEMHTML, BEMJSON и другие
специфичные технологии.

## Цели

*   Низкий порог вхождения — HTML синтаксис, без всяких трансляций одного языка в
    другой.
*   Портабельность — инструмент должен легко портироваться на разные языки, такие
    как PHP или Pyhon.
*   Работа совместно с другими шаблонизаторами, а не вместо них.
*   Простота использования — можно быстро задействовать где угодно, ничего не
    ломая.

## Пример

```html
<div block="b-animals">
  <div elem="cat" mod="size:big, color:red"></div>
</div>
```

транслируется в

```html
<div class="b-animals">
  <div class="b-animals__cat b-animals__cat_size_big b-animals__cat_color_red"></div>
</div>
```

## Как использовать

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

## Синтаксис

### Блоки

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

### Элементы

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

### Модификаторы

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

### Миксы

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

Для сложных значений можно использовать псевдо-JSON синтаксис:

```html
<div block="unicorn" mix="block:animals, elem:item, mod:{size:large,gender:female}"></div>
<div block="unicorn" mix="{block:b-mix-1}, {block:b-mix-2, mod:[mod1, mod2]}"></div>
```

```html
<div class="unicorn animals__item animals__item_size_large animals__item_gender_female"></div>
<div class="unicorn b-mix-1 b-mix-2 b-mix-2_mod1 b-mix-2_mod_2"></div>
```
