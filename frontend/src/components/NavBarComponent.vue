<!-- Navbar.vue -->
<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/chat">Chat</router-link></li>
        <li v-if="!user"> <router-link to="/login">Login</router-link> </li>
        <li v-if="user"><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: null,
      };
    },
    created() {
      this.checkUserStatus();
    },
    methods: {
      async checkUserStatus() {
        const res = await fetch('/auth/user', { credentials: 'include' });
        const data = await res.json();
        if (data.user) {
          this.user = data.user;
        }
      },
      async logout() {
        await fetch('/auth/logout', { method: 'GET', credentials: 'include' });
        this.user = null;
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  nav {
    background-color: #333;
    padding: 1rem;
    color: white;
  }
  nav ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }
  nav li {
    display: inline;
  }
</style>