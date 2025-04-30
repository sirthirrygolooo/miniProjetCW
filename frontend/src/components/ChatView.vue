<template>
  <div>
    <h1>Chat en temps réel</h1>
    <ul id="messages">
      <li v-for="msg in messages" :key="msg._id">
        <strong>{{ msg.user.displayName }}:</strong> {{ msg.message }} <small>{{ msg.timestamp }}</small>
      </li>
    </ul>
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
      messages: [],
    };
  },
  created() {
    this.socket = io({
      auth: { username: localStorage.getItem('username') || 'Anonyme' },
    });

    this.socket.on('chat message', (data) => {
      this.messages = data.messages;
      this.$nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
    });
  },
  methods: {
    sendMessage() {
      if (this.message) {
        this.socket.emit('chat message', this.message);
        this.message = '';
      }
    },
  },
};
</script>