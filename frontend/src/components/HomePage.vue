<template>
  <div>
    <h1>Bienvenue sur la page d'accueil</h1>
    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script>
import axios from 'axios';
const loginSuccessSound = new Audio(require('@/assets/oof.mp3'));

export default {
  methods: {
    async logout() {
      try {
        loginSuccessSound.play();

        await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
        localStorage.removeItem('user');
        this.$router.push('/');
      } catch (error) {
        console.error('Erreur de déconnexion', error);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #4A148C;
  height: 100vh;
  color: #E0E0E0;
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  color: white;
}

button {
  background-color: #9C27B0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #7B1FA2;
}
</style>