import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import RegisterView from '../views/RegisterView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/profile', component: ProfileView },
  { path: '/register', component: RegisterView },
  { path: '/access-denied', component: AccessDeniedView }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path === '/profile' && !token) {
    next('/access-denied');
  } else {
    next();
  }
});


export default router
