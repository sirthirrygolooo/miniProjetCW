<template>
  <div>
    <div class="big-names">
      <h2>James GENITRINI & Jean-Baptiste FROEHLY</h2> 
    </div>
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link v-if="!isAuthenticated" to="/register">S'inscrire</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Se connecter</router-link>
      <router-link v-if="isAuthenticated" to="/profile">Profil</router-link>
      <button v-if="isAuthenticated" @click="logout" class="disconnect">Déconnexion</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

const oofSound = new Audio(require('@/assets/oof.mp3'));

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapMutations(['setToken']),
    logout() {
      oofSound.play(); 
      this.setToken(null); 
      this.$router.push('/login');
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  background: url('@/assets/peepo.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #E0E0E0; 
}

body {
  font-family: Arial, sans-serif;
  background: url('@/assets/peepo.jpg') no-repeat center center fixed;
  background-size: cover; 
  color: #E0E0E0; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #9C27B0; 
  text-align: center;
}

button {
  background-color: #9C27B0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #7B1FA2;
}


.big-names h2 {
  font-size: 32px;
  font-weight: bold;
  color: #FFC107; 
  margin-bottom: 20px;
  text-align: center;
}
</style>