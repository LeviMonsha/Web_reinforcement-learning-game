<template>
    <div class="text-center">
      <h2 class="text-2xl font-semibold mb-4">Добро пожаловать в игру!</h2>
      <GameComponent />
    </div>
  </template>
  
  <script>
  import GameComponent from '../components/GameComponent.vue';
  
  export default {
    components: {
      GameComponent,
    },
  };
  </script>
  
  <style scoped>
  
  </style>
