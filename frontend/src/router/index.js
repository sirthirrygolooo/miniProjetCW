import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/HomePage.vue';
import LoginForm from '../components/LoginForm.vue';

function isAuthenticated() {
  return localStorage.getItem('user') !== null;
}

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/home',
      name: 'Home',
      component: HomePage,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next();
        } else {
          next('/');
        }
      }
    },
  ]
});
