<template>
  <div>
    <h2>Connexion</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  data() {
    return { email: '', password: '' };
  },
  methods: {
    ...mapMutations(['setToken']),
    async login() {
      try {
        const { data } = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        });
        this.setToken(data.token); // ⬅ On met le token dans Vuex !
        this.$router.push('/profile');
      } catch {
        alert("Erreur de connexion !");
      }
    }
  }
};
</script>

<style>
input {
  margin: 10px;
}
</style>