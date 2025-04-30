<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Mot de passe" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
const loginSuccessSound = new Audio(require('@/assets/oof.mp3'));

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    async login() {
      try {
        loginSuccessSound.play();
        
        const { data } = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        });

        if (data.token) {
          this.setToken(data.token);
          // localStorage.setItem('user', JSON.stringify({
          //   email: this.email,
          //   token: data.token
          // }));
          this.$router.push('/profile');
        } else {
          alert('Erreur de connexion');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion', error);
        alert('Erreur de connexion');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
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

.login-form {
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