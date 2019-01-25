import Carousel from './carousel.vue';

Carousel.install = (Vue) => {
  Vue.component(Carousel.name, Carousel);
};

export default Carousel;
