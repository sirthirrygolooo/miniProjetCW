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
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  color: white;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

nav li {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease, border-bottom 0.3s ease;
}

nav li:hover {
  background-color: transparent;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 0;
}

nav a:hover {
  transform: scale(1.5);
  transition: all 0.3s ease;
}

button {
  padding: 10px 20px;
  border: none;
  background: #ff4757;
  color: white;
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #ff1f3f;
  transform: scale(1.05);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
