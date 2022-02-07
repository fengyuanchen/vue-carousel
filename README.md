# vue-carousel

[![Coverage Status](https://img.shields.io/codecov/c/github/fengyuanchen/vue-carousel.svg)](https://codecov.io/gh/fengyuanchen/vue-carousel) [![Downloads](https://img.shields.io/npm/dm/@chenfengyuan/vue-carousel.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-carousel) [![Version](https://img.shields.io/npm/v/@chenfengyuan/vue-carousel.svg)](https://www.npmjs.com/package/@chenfengyuan/vue-carousel) [![Gzip Size](https://img.shields.io/bundlephobia/minzip/@chenfengyuan/vue-carousel.svg)](https://unpkg.com/@chenfengyuan/vue-carousel/dist/vue-carousel.js)

> Carousel component for Vue 3. For Vue 2, check out the [`v1`](https://github.com/fengyuanchen/vue-carousel/tree/v1) branch.

- [Docs](src/README.md)
- [Demo](https://fengyuanchen.github.io/vue-carousel)

## Main files

```text
dist/
├── vue-carousel.js         (UMD, default)
├── vue-carousel.min.js     (UMD, compressed)
├── vue-carousel.esm.js     (ECMAScript Module)
├── vue-carousel.esm.min.js (ECMAScript Module, compressed)
└── vue-carousel.d.ts       (TypeScript Declaration File)
```

## Getting started

### Installation

Using npm:

```shell
npm install vue@3 @chenfengyuan/vue-carousel@2
```

Using pnpm:

```shell
pnpm add vue@3 @chenfengyuan/vue-carousel@2
```

Using Yarn:

```shell
yarn add vue@3 @chenfengyuan/vue-carousel@2
```

Using CDN:

```html
<script src="https://unpkg.com/vue@3"></script><!-- Vue.js is required -->
<script src="https://unpkg.com/@chenfengyuan/vue-carousel@2"></script>
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
