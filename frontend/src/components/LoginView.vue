<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <button @click="loginWithGoogle">Se connecter avec Google</button>
    <button @click="loginWithGitHub">Se connecter avec GitHub</button>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    loginWithGoogle() {
      this.openPopup('/auth/google');
    },
    loginWithGitHub() {
      this.openPopup('/auth/github');
    },
    openPopup(url) {
      const width = 500;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;

      const popup = window.open(
        url,
        '_blank',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );

      const popupChecker = setInterval(async () => {
        if (popup.closed) {
          clearInterval(popupChecker);

          const res = await fetch('/auth/user', {
            credentials: 'include'
          });

          const data = await res.json();
          if (data.user) {
            this.$router.push('/chat');
          } else {
            alert('Connexion échouée');
          }
        }
      }, 500);
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 100px auto;
}

.login-container:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

h1 {
  color: #333;
}

button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  background: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #1e724c;
}
</style>
