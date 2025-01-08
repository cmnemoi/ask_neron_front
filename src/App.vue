<template>
  <ChatBot />
</template>

<script setup lang="ts">
import ChatBot from './components/ChatBot.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #0a0a2a;
  font-family: 'Roboto', sans-serif;
}

#app {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
