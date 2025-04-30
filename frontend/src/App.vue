<template>
  <div id="app">
    <br><br><br><br><br>
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
  width: 100vw;
  background: url('@/assets/peepo.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #E0E0E0;
}

nav {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 10;
}

router-link {
  color: #E0E0E0;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

router-link:hover {
  color: #9C27B0;
}

button.disconnect {
  background-color: #FF5722;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.big-names h2 {
  font-size: 32px;
  font-weight: bold;
  color: #FFC107;
  margin-bottom: 20px;
  text-align: center;
}

h1, h2 {
  color: #9C27B0;
  text-align: center;
  width: 100%;
}

button {
  background-color: #9C27B0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #7B1FA2;
}

router-view {
  flex-grow: 1;
  width: 100%;
  padding: 20px;
  margin-top: 60px;
}
</style>