<template>
  <div>
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

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapMutations(['setToken']),
    logout() {
      this.setToken(null);
      this.$router.push('/login');
    }
  }
};
</script>