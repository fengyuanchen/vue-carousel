import { createApp } from 'vue';
import VueFeather from 'vue-feather';
import App from './app.vue';
import DemoBlock from './components/demo-block.vue';
import VueCarousel from '../src';

const app = createApp(App);

app.component(DemoBlock.name, DemoBlock);
app.component(VueFeather.name as string, VueFeather);
app.component(VueCarousel.name, VueCarousel);
app.mount('#app');
