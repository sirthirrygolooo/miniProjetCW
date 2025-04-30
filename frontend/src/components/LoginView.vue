<template>
  <div class="login-container">
    <h1>Connexion</h1>
    <button class="login-button google" @click="loginWithGoogle">
      <img src="https://www.pngkit.com/png/full/178-1783296_g-transparent-circle-google-logo.png" alt="Google Logo" />
      Se connecter avec Google
    </button>
    <button class="login-button github" @click="loginWithGitHub">
      <img src="https://static-00.iconduck.com/assets.00/github-icon-2048x2048-eyd5tyuo.png" alt="GitHub Logo" />
      Se connecter avec GitHub
    </button>
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
            window.location.reload();
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
  margin: 50px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 2em;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  font-size: 1em;
  font-weight: bold;
}

.login-button img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.login-button.google {
  background: #4285f4;
  color: white;
}

.login-button.google:hover {
  background: #357ae8;
  transform: translateY(-3px);
}

.login-button.github {
  background: #24292e;
  color: white;
}

.login-button.github:hover {
  background: #1b1f23;
  transform: translateY(-3px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
