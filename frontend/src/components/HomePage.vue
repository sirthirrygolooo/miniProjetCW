<template>
  <div class="home">
    <h1>Bienvenue !</h1>
    <p v-if="!user">
      Pour discuter, veuillez vous
      <router-link to="/login">connecter</router-link>.
    </p>
    <p v-else>
      Bienvenue, {{ user.username }}! <br />
      Vous êtes connecté. <br />
      <router-link to="/chat">Accéder au chat</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
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
        if (!res.ok) {
          throw new Error('Utilisateur non authentifié');
        }
        const data = await res.json();
        if (data.user) {
          this.user = data.user;
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 2.5em;
  color: #333;
}

p {
  font-size: 1.2em;
}

a {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #1e724c;
  transition: color 0.5s ease;
  cursor: pointer;
}
</style>
