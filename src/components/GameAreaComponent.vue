<template>
  <div
    class="tv-screen bg-black rounded-lg border-4 border-gray-600 h-[80%] relative"
  >
    <TrackCanvas
      :width="screenWidth"
      :height="screenHeight"
      :isDrawingAllowed="!isGameRunning"
    />
    <Car
      ref="car"
      :speed="carSpeed"
      :size="carSize"
      :bonuses="bonuses"
      @bonus-collected="handleBonusCollected"
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
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TrackCanvas from "./TrackCanvasComponent.vue";
import Car from "./CarComponent.vue";
import Bonus from "./BonusComponent.vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  screenWidth: Number,
  screenHeight: Number,
  isGameRunning: Boolean,
});

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

const clearBonuses = () => {
  bonuses.value.length = 0;
};
</script>

<style scoped></style>
