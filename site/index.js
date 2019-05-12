import Vue from 'vue';
import VueFeather from 'vue-feather';
import App from './app.vue';
import Demo from './components/demo.vue';
import VueCarousel from '../src';

Vue.component('demo', Demo);
Vue.component(VueFeather.name, VueFeather);
Vue.component(VueCarousel.name, VueCarousel);

export default new Vue({
  el: '#app',
  render: createElement => createElement(App),
});
