# Changelog

## 1.0.6 (Jan 23, 2021)

- Fix the issue of the right and down directions are not work as expected.
- Fix the issue of the carousel does not play again after the mouse left.

## 1.0.5 (May 18, 2020)

- Improve the `pauseOnEnter` and `slideOnSwipe` props. (#24).

## 1.0.4 (May 17, 2020)

- Fix the issue of the `pauseOnEnter` and `slideOnSwipe` props. (#18).
- Add `type` attribute to control buttons for avoiding side-effect (#22).
- Fix the cached `index` value when the `data` prop is changed (#23).

## 1.0.3 (Jan 11, 2020)

- Improve browser detecting for SSR (#20).

## 1.0.2 (May 12, 2019)

- Only set `touch-action: none` when the `slideOnSwipe` is set to `true` on mobile (#4).

## 1.0.1 (Feb 14, 2019)

- Fix wrong method name (#5).

## 1.0.0 (Jan 26, 2019)

- Add 2 new props: `pauseOnEnter` and `slideOnSwipe`.
- Support to use as a Vue plugin: `Vue.use(VueCarousel)`.
- Support to use as a Vue component: `Vue.component(VueCarousel.name, VueCarousel)`.
- Register the component automatically once loaded in the browser.

## 0.1.1 (Aug 5, 2018)

- Force production mode to reduce the size of the bundled files.

## 0.1.0 (Jun 28, 2018)

- Support 9 props: `autoplay`, `controls`, `data`, `direction`, `indicators`, `indicatorTrigger`, `indicatorType`, `interval` and `tag`.
- Support 5 methods: `play`, `stop`, `prev`, `next` and `slideTo`.
