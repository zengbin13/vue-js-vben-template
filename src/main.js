import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';

// css
import './design/index.scss';
import 'element-plus/dist/index.css';

function bootStrap() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  app.mount('#app');
}

bootStrap();
