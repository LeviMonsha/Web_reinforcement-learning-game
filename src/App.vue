<template>
  <div id="app">
    <HomePage v-if="!gameStarted" @start="startGame" />
    <GamePage v-else :mode="gameMode" @start="handleReturnToMenu" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomePage from "./pages/HomePage.vue";
import GamePage from "./pages/GamePage.vue";

const gameStarted = ref(false);
const gameMode = ref("");

const startGame = (mode) => {
  gameMode.value = mode;
  gameStarted.value = true;
};

const handleReturnToMenu = () => {
  gameStarted.value = false;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
