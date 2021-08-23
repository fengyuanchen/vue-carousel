# vue-carousel

[![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/vue-carousel.svg)](https://codecov.io/gh/fengyuanchen/vue-carousel) [![Downloads](https://img.shields.io/npm/dm/@chenfengyuan/vue-carousel.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-carousel) [![Version](https://img.shields.io/npm/v/@chenfengyuan/vue-carousel/next.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-carousel) [![Gzip Size](https://img.shields.io/bundlephobia/minzip/@chenfengyuan/vue-carousel.svg)](https://unpkg.com/@chenfengyuan/vue-carousel/dist/vue-carousel.js)

> Carousel component for Vue 3.

- [Docs](src/README.md)
- [Demo](https://fengyuanchen.github.io/vue-carousel)

## Main files

```text
dist/
├── vue-carousel.js         (UMD, default)
├── vue-carousel.min.js     (UMD, compressed)
├── vue-carousel.esm.js     (ECMAScript Module)
└── vue-carousel.esm.min.js (ECMAScript Module, compressed)
```

## Getting started

### Installation

Using npm:
```shell
npm install vue@next @vue/compiler-sfc @chenfengyuan/vue-carousel@next
```

Using Yarn:
```shell
yarn add vue@next @vue/compiler-sfc @chenfengyuan/vue-carousel@next
```

In browser:

```html
<script src="/path/to/vue.js"></script><!-- Vue.js is required -->
<script src="/path/to/vue-carousel.js"></script>
```

### Usage

```js
import { createApp } from 'vue';
import VueCarousel from '@chenfengyuan/vue-carousel';

const app = createApp({});

app.component(VueCarousel.name, VueCarousel);
```

```html
<vue-carousel :data="['Slide 1', 'Slide 2', 'Slide 3']"></vue-carousel>
```

## Browser support

Same as Vue 3.

## Versioning

Maintained under the [Semantic Versioning guidelines](https://semver.org/).

## License

[MIT](https://opensource.org/licenses/MIT) © [Chen Fengyuan](https://chenfengyuan.com/)
