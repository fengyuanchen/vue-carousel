# vue-carousel

[![Build Status](https://img.shields.io/travis/fengyuanchen/vue-carousel.svg)](https://travis-ci.org/fengyuanchen/vue-carousel) [![Downloads](https://img.shields.io/npm/dm/@chenfengyuan/vue-carousel.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-carousel) [![Version](https://img.shields.io/npm/v/@chenfengyuan/vue-carousel.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-carousel)

> Carousel component for [Vue.js](https://vuejs.org).

- [Docs](src/README.md)
- [Demo](https://fengyuanchen.github.io/vue-carousel)

## Main

```text
dist/
├── vue-carousel.js        (UMD)
├── vue-carousel.min.js    (UMD, compressed)
├── vue-carousel.common.js (CommonJS, default)
└── vue-carousel.esm.js    (ES Module)
```

## Getting started

### Installation

```shell
npm install vue vue-template-compiler @chenfengyuan/vue-carousel
```

In browser:

```html
<script src="/path/to/vue.js"></script><!-- Vue.js is required -->
<script src="/path/to/vue-carousel.js"></script><!-- Register automatically once loaded -->
```

### Usage

```js
import Vue from 'vue';
import VueCarousel from '@chenfengyuan/vue-carousel';

Vue.use(VueCarousel);
// Or
Vue.component(VueCarousel.name, VueCarousel);
// Or
Vue.component('vue-carousel', VueCarousel);
```

```html
<carousel :data="['Slide 1', 'Slide 2', 'Slide 3']"></carousel>
```

## Browser support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer 9+

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com)
