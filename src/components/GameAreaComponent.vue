<template>
  <div
    ref="tvScreen"
    class="tv-screen bg-black rounded-lg border-4 border-gray-600 h-[80%] relative"
  >
    <TrackCanvas
      :width="screenWidth"
      :height="screenHeight"
      :isDrawingAllowed="!isGameRunning"
    >
      <Car
        ref="car"
        :speed="carSpeed"
        :size="carSize"
        :bonuses="bonuses"
        @bonus-collected="checkCollisions"
        @check-collision="checkCollisions"
        :screenWidth="screenWidth"
        :screenHeight="screenHeight"
      />
      <Bonus
        v-for="bonus in bonuses"
        :key="bonus.id"
        class="absolute bg-yellow-500"
        :style="{
          width: '20px',
          height: '20px',
          top: bonus.y + 'px',
          left: bonus.x + 'px',
        }"
      />
    </TrackCanvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import TrackCanvas from "./TrackCanvasComponent.vue";
import Car from "./CarComponent.vue";
import Bonus from "./BonusComponent.vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  screenWidth: Number,
  screenHeight: Number,
  isGameRunning: Boolean,
});

const tvScreen = ref(null);
const screenWidth = ref(0);
const screenHeight = ref(0);
const bonuses = ref([]);
const isGameRunning = ref(false);
let bonusInterval;

const generateBonus = () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");

  let bonusPosition;
  let r, g, b, a;

  do {
    bonusPosition = {
      x: Math.floor(Math.random() * (canvas.width - 50)),
      y: Math.floor(Math.random() * canvas.height),
    };

    const imageData = context.getImageData(
      bonusPosition.x,
      bonusPosition.y,
      1,
      1
    );
    const data = imageData.data;

    r = data[0];
    g = data[1];
    b = data[2];
    a = data[3];
  } while (r === 255 && g === 255 && b === 255 && a > 0);

  bonuses.value.push({ id: Date.now(), ...bonusPosition });
};

const checkCollisions = (carPosition) => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  const context = canvas.getContext("2d");

  // Проверка на белую линию под машиной
  const isWhitePixel = (data) =>
    data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] > 0;

  for (let i = 0; i < props.size; i++) {
    for (let j = 0; j < props.size; j++) {
      const imageData = context.getImageData(
        carPosition.x + i,
        carPosition.y + j,
        1,
        1
      );

      if (isWhitePixel(imageData.data)) {
        // eslint-disable-next-line no-undef
        emit("game-over"); // Эмитируем событие о завершении игры
        return;
      }
    }
  }

  for (const bonus of bonuses.value) {
    if (
      carPosition.x >= bonus.x &&
      carPosition.x <= bonus.x + 20 &&
      carPosition.y >= bonus.y &&
      carPosition.y <= bonus.y + 20
    ) {
      // eslint-disable-next-line no-undef
      // emit("bonus-collected"); // Эмитируем событие о сборе бонуса
      bonuses.value.splice(bonuses.value.indexOf(bonus), 1); // Удаляем собранный бонус из массива
      break;
    }
  }
};

// const handleBonusCollected = () => {
//   score.value += 10;
// };

const clearBonuses = () => {
  bonuses.value.length = 0;
};

watch(
  () => props.isGameRunning,
  (newValue) => {
    if (newValue) {
      bonusInterval = setInterval(generateBonus, 1500);
    } else {
      clearBonuses();
      clearInterval(bonusInterval);
    }
  }
);

onMounted(() => {
  if (tvScreen.value) {
    screenWidth.value = tvScreen.value.clientWidth;
    screenHeight.value = tvScreen.value.clientHeight;
  }
});
</script>

<style scoped></style>
