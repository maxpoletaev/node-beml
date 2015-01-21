# BEML [![Build Status][build]][build-link]

[build]: https://travis-ci.org/zenwalker/node-beml.png?branch=master
[build-link]: https://travis-ci.org/zenwalker/node-beml

Это небольшой HTML препрцессор (или постпроцессор) облегчающий напиание BEM
разметки путем расширения HTML синтаксиса.

## Зачем?

Чистый HTML в BEM стиле довльно сложен для чтения. Так же я (да и не только я)
люблю HTML и не считаю необходимым использовать BEMHTML, BEMJSON и другие
спецэфичные технологии.

## Цели

*   Низкий порог вхождения — HTML синтаксис, без всяких трансляций одного языка в
    другой.

*   Портабельность — инструмент должен легко портироваться на разные языки (такие
    как PHP или Pyhon).

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
<div block="b-animal"></div>
```

### Элементы

```html
<div elem="name"></div>                  <!-- element of parent block -->
<div block="b-animal" elem="name"></div> <!-- element of specific block -->
```

### Модификаторы

```html
<div block="b-block" mod="size:big, color:red"></div>
```

### Миксы

```html
<div block="b-block" mix="block:b-mix, elem:elem"></div>
```

Для сложных значений можно использовать псевдо-JSON синтаксис:

```html
<div block="b-block" mix="{block:b-mix, mod:{mod1:val1,mod2:val2}}"></div>
<div block="b-block" mix="{block:b-mix-1},{block:b-mix-2}"></div>
```
