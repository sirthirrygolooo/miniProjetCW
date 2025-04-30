<template>
  <div>
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
      const width = window.screen.width;
      const height = window.screen.height;

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
          console.log(data);
          if (data.user) {
            popup.close();
            this.$router.push('/');
          } else {
            alert('Connexion échouée');
          }
        }
      }, 500);
    }
  }
};
</script>