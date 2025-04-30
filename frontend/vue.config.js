// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    port: 5000,
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
      },
    },
  },
};

