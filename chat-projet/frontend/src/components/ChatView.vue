<template>
  <div>
    <h1>Chat en temps réel</h1>
    <ul id="messages"></ul>
    <form id="form" @submit.prevent="sendMessage">
      <input id="input" v-model="message" autocomplete="off" />
      <button>Envoyer</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      message: '',
    };
  },
  created() {
  fetch('http://localhost:3000/user', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Non connecté');
        return res.json();
    })
      .then(user => {
        console.log('Connecté en tant que :', user.displayName || user.email);
      })
      .catch(err => {
        console.warn('Utilisateur non connecté');
        console.error(err);
      });

    this.socket = io({ withCredentials: true });
  }
,
  mounted() {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
    });

    this.socket.on('chat message', (msg, sender, time) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>[${time}] ${sender}: </strong> ${msg}`;
      document.getElementById('messages').appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    this.socket.on('status message', (msg, color) => {
      const item = document.createElement('li');
      item.textContent = msg;
      item.style.color = color;
      document.getElementById('messages').appendChild(item);
    });

    this.socket.on('unauthorized', () => {
      alert('Non autorisé, veuillez vous connecter.');
      window.location.href = '/login';
    });
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        this.socket.emit('chat message', this.message);
        this.message = '';
      }
    },
  },
};
</script>