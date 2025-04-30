import { createRouter, createWebHistory } from 'vue-router';
import Chat from './components/ChatView.vue';
import Login from './components/LoginView.vue';
import HomeView from './views/HomeView.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomeView },
  { path: '/chat', component: Chat, beforeEnter: (to, from, next) => {
    fetch('/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          next(); 
        } else {
          next('/login');
        }
      });
  }},
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;