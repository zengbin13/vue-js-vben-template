import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/login', component: () => import('../views/sys/login/Login.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app) {
  app.use(router);
}
