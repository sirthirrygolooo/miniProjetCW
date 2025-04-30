<template>
  <div class="profile-container">
    <h1>Mon Profil</h1>
    <p>Email : {{ email }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { email: '' };
  },
  async mounted() {
    try {
      const { data } = await axios.get('http://localhost:3000/profile', {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      });
      this.email = data.email;
    } catch {
      this.$router.push('/access-denied');
    }
  },
};
</script>

<style scoped>
.profile-container {
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

p {
  color: #E0E0E0;
  font-size: 18px;
}
</style>