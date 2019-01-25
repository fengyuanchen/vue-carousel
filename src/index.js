import Carousel from './carousel.vue';

Carousel.install = (Vue) => {
  Vue.component(Carousel.name, Carousel);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Carousel);
}

export default Carousel;
