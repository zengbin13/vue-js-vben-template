import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';

// css
import './design/index.scss';
import 'element-plus/dist/index.css';

function bootStrap() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  setupRouterGuard();
  app.mount('#app');
}

bootStrap();
