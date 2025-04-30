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
    this.socket = io({
      auth: { username: localStorage.getItem('username') || 'Anonyme' },
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
  },
  methods: {
    sendMessage() {
      if (this.message) {
        const clientOffset = `${this.socket.id}-${Date.now()}`;
        this.socket.emit('chat message', this.message, clientOffset);
        this.message = '';
      }
    },
  },
};
</script>
