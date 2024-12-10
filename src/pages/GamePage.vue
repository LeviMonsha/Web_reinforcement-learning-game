<template>
  <div class="flex items-center justify-center h-screen bg-gray-900">
    <ScoreBoard :score="score" :time="time" />
    <div
      class="tv-container relative w-full h-full max-w-4xl max-h-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <GameArea
        :screenWidth="screenWidth"
        :screenHeight="screenHeight"
        :isGameRunning="isGameRunning"
        @game-over="handleGameOver"
        @bonus-collected="handleBonusCollected"
      />

      <div
        class="tv-controls absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-gray-700"
      >
        <button
          @click="startGame"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Запустить игру
        </button>
        <button
          @click="stopGame"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Остановить игру
        </button>
        <button
          @click="returnToMenu"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Меню
        </button>
      </div>

      <div
        v-if="isGameOver"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
      >
        Игра окончена! Ваш счет: {{ score }}
        <button @click="restartGame">Попробовать снова</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GameArea from "@/components/GameAreaComponent.vue";
import ScoreBoard from "@/components/ScoreBoardComponent.vue";

const score = ref(0);
const time = ref(10);
const isGameRunning = ref(false);
const isGameOver = ref(false);
let timerInterval;

// eslint-disable-next-line no-undef
const emit = defineEmits(["start"]);

const handleBonusCollected = (bonus) => {
  score.value += bonus.size;
};

const startGame = () => {
  isGameRunning.value = true;
  isGameOver.value = false;
  time.value = 10;

  timerInterval = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1;
    } else {
      handleGameOver();
    }
  }, 1000);
};

const stopGame = () => {
  isGameRunning.value = false;
  clearInterval(timerInterval);
};

const handleGameOver = () => {
  isGameRunning.value = false;
  clearInterval(timerInterval);
  isGameOver.value = true;
};

const restartGame = () => {
  score.value = 0;
  startGame();
};

const returnToMenu = () => {
  stopGame();
  isGameOver.value = false;
  emit("start", "menu");
};
</script>

<style scoped></style>
