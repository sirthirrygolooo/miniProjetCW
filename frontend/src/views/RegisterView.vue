<template>
    <div>
      <h2>Inscription</h2>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button @click="register">S'inscrire</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { email: '', password: '' };
    },
    methods: {
      async register() {
        try {
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