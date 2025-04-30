<template>
  <div class="chat-container">
    <h1>Chat en temps réel</h1>
    <ul id="messages">
      <li v-for="msg in messages" :key="msg._id" class="message">
        <strong>{{ msg.user.displayName }}:</strong> {{ msg.message }} <small>{{ msg.timestamp }}</small>
      </li>
    </ul>
    <form id="form" @submit.prevent="sendMessage">
      <input id="input" v-model="message" autocomplete="off" placeholder="Tapez votre message..." />
      <button type="submit">Envoyer</button>
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
      if (this.message.trim()) {
        this.socket.emit('chat message', this.message);
        this.message = '';
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

#messages {
  list-style-type: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.message {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

#form {
  display: flex;
  margin-top: 20px;
}

#input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
