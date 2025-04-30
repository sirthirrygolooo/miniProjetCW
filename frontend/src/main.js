import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path === '/profile' && !token) {
    alert("Tu dois être connecté !");
    next('/');
  } else {
    next();
  }
});