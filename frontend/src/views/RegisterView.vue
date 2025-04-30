<template>
  <div class="register-container">
    <h1>Inscription</h1>
    <form @submit.prevent="register" class="register-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
const loginSuccessSound = new Audio(require('@/assets/oof.mp3'));

import axios from 'axios';

export default {
  data() {
    return { email: '', password: '' };
  },
  methods: {
    async register() {
      try {
        loginSuccessSound.play();

        await axios.post('http://localhost:3000/register', {
          email: this.email,
          password: this.password
        });
        alert("Inscription réussie !");
        this.$router.push('/login');
      } catch {
        alert("Erreur : email déjà utilisé !");
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #282828;
  border-radius: 10px;
}

h1 {
  color: #9C27B0;
  margin-bottom: 20px;
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #9C27B0;
  background-color: #333;
  color: #E0E0E0;
}

input:focus {
  outline: none;
  border-color: #7B1FA2;
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