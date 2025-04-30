<template>
  <div>
    <h2>Mon Profil</h2>
    <p>Email: {{ email }}</p>
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