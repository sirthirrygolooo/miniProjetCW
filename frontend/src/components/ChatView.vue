<template>
  <div class="chat-container">
    <h1>Chat en temps réel</h1>
    <ul id="messages">
      <li v-for="msg in messages" :key="msg._id" class="message">
        <strong v-if="msg.user && msg.user.displayName">{{ msg.user.displayName }} à <small>{{ formatTimestamp(msg.timestamp) }}</small> : </strong>
        <span v-else>Utilisateur inconnu à <small>{{ formatTimestamp(msg.timestamp) }}</small> : </span>
        {{ msg.message }}
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
import moment from 'moment';

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
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        console.log('Récupération des messages...');
        // marche paaaaas
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    },
    sendMessage() {
      if (this.message.trim()) {
        this.socket.emit('chat message', this.message);
        this.message = '';
      }
    },
    formatTimestamp(timestamp) {
      return moment(timestamp).format('HH:mm:ss');
    },
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2em;
}

#messages {
  list-style-type: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.message strong {
  font-weight: bold;
  color: #007bff;
}

.message span {
  color: #777;
}

.message small {
  color: #999;
  margin-top: 5px;
  font-size: 0.8em;
}

#form {
  display: flex;
  background: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 12px;
}

#input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 1em;
}

button {
  padding: 12px 20px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>
