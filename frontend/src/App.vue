<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/NavBarComponent.vue';

export default {
  components: {
    Navbar,
  },
  mounted() {
    console.log('App component mounted!');
  },
};
</script>