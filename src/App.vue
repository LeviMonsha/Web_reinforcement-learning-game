<template>
  <div id="app">
    <HomePage v-if="!gameStarted" @start="startGame" />
    <GameField v-else :mode="gameMode" @start="handleReturnToMenu" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomePage from "./pages/HomePage.vue";
import GameField from "./components/GameFieldComponent.vue";

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
