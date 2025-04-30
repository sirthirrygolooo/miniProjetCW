<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/chat">Chat</router-link></li>
      <li v-if="!user"><router-link to="/login">Login</router-link></li>
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
      try {
        const res = await fetch('/auth/user', { credentials: 'include' });
        const data = await res.json();
        if (data.user) {
          this.user = data.user;
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', error);
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
  border-radius: 5px;
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
  border-bottom: 3px solid white;
}

nav li:hover {
  background-color: #444;
  border-radius: 4px;
  border-bottom: 3px solid #ff4757;
  transition: background-color 0.3s ease, border-bottom 0.3s ease;
  cursor: pointer;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: none;
  background-color: transparent;
}

button {
  padding: 5px 10px;
  border: none;
  background: #ff4757;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #ff1f3f;
}
</style>
