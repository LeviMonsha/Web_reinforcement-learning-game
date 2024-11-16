<template>
    <div class="score-board">
      <h4 class="text-lg">Текущий счет: {{ score }}</h4>
    </div>
  </template>
  
  <script>
  export default {
    props: ['score'],
  };
  </script>
  
  <style scoped>
  .score-board {
    margin-top: 20px;
  }
  </style>
  