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
        @bonus-collected="handleBonusCollected"
        @collision-check="handleCheckCollision"
        :screenWidth="screenWidth"
        :screenHeight="screenHeight"
      />
      <Bonus
        v-for="bonus in bonuses"
        :key="bonus.id"
        :size="bonus.size"
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

// eslint-disable-next-line no-undef
const emit = defineEmits(["bonus-collected", "game-over"]);

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
  const bonusSize = 30;
  let r, g, b, a;

  do {
    bonusPosition = {
      x: Math.floor(Math.random() * (canvas.width - 30)),
      y: Math.floor(Math.random() * canvas.height),
      size: bonusSize,
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

const handleBonusCollected = (bonus) => {
  // eslint-disable-next-line no-undef
  emit("bonus-collected", bonus);
  bonuses.value.splice(bonuses.value.indexOf(bonus), 1);
};

const handleCheckCollision = () => {
  // eslint-disable-next-line no-undef
  emit("game-over");
};

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
