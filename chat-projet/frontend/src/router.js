import { createRouter, createWebHistory } from 'vue-router';
import Chat from './components/ChatView.vue';
import Login from './components/LoginView.vue';

const routes = [
  { path: '/', component: Chat },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
