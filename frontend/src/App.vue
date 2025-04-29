<template>
  <div id="app">
    <div class="big-names">
      <h2>James GENITRINI & Jean-Baptiste FROEHLY</h2> 
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: url('@/assets/peepo.jpg') no-repeat center center fixed;
  background-size: cover; 
  color: #E0E0E0; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}


h1 {
  color: #9C27B0; 
  text-align: center;
}

button {
  background-color: #9C27B0;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #7B1FA2;
}

#app {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #1E1E1E;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.big-names h2 {
  font-size: 32px;
  font-weight: bold;
  color: #FFC107; 
  margin-bottom: 20px;
  text-align: center;
}
</style>