<template>
  <div
    class="flex items-center justify-center h-screen bg-gray-900"
    @keydown="isGameRunning ? handleKeydown : null"
    tabindex="0"
  >
    <ScoreBoard :score="score" :status="scoreStatus" />
    <div
      class="tv-container relative w-full h-full max-w-4xl max-h-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div
        class="tv-screen bg-black rounded-lg border-4 border-gray-600 h-[80%] relative"
      >
        <TrackCanvas
          @lineDrawn="checkColorUnderCar"
          :width="screenWidth"
          :height="screenHeight"
          :isDrawingAllowed="!isGameRunning"
        >
          <Car :position="position" :color="carColor" />
          <BonusComponent
            v-for="bonus in bonuses"
            :key="bonus.id"
            :x="bonus.x"
            :y="bonus.y"
          />
        </TrackCanvas>
      </div>

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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { WIDTH_CAR, HEIGHT_CAR, SPEED } from "../constants.js";
import TrackCanvas from "./TrackCanvasComponent.vue";
import Car from "./CarComponent.vue";
import BonusComponent from "./BonusComponent.vue";
import ScoreBoard from "./ScoreBoardComponent.vue";

const initialPosition = { x: 50, y: 50 };
const position = ref({ x: 50, y: 50 });

const carColor = ref("blue");
const scoreStatus = ref("green");
const score = ref(0);
const bonuses = ref([]);
// eslint-disable-next-line no-unused-vars
let bonusInterval;
const isGameRunning = ref(false);

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps(["mode"]);
// eslint-disable-next-line no-undef
const emit = defineEmits(["start"]);

const moveCar = (direction) => {
  const canvas = document.querySelector("canvas");
  switch (direction) {
    case "up":
      if (position.value.y > 0) position.value.y -= SPEED;
      break;
    case "down":
      if (position.value.y < canvas.height) position.value.y += SPEED;
      break;
    case "left":
      if (position.value.x > 0) position.value.x -= SPEED;
      break;
    case "right":
      if (position.value.x < canvas.width - 50) position.value.x += SPEED;
      break;
  }
};

const handleKeydown = (event) => {
  if (props.mode === "manual") {
    switch (event.key) {
      case "w":
        moveCar("up");
        break;
      case "s":
        moveCar("down");
        break;
      case "a":
        moveCar("left");
        break;
      case "d":
        moveCar("right");
        break;
    }
  }
  checkColorUnderCar();
};

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

const checkColorUnderCar = () => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const { x, y } = position.value;

  const isWhitePixel = (data) =>
    data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] > 0;

  for (let i = 0; i < WIDTH_CAR; i++) {
    for (let j = 0; j < HEIGHT_CAR; j++) {
      const imageData = context.getImageData(x + i, y + j, 1, 1);
      if (isWhitePixel(imageData.data)) {
        resetGame();
        clearBonuses();
        return;
      }

      for (const bonus of bonuses.value) {
        if (
          x + i >= bonus.x &&
          x + i <= bonus.x + 20 &&
          y + j >= bonus.y &&
          y + j <= bonus.y + 20
        ) {
          score.value += 10;
          bonuses.value = bonuses.value.filter((b) => b !== bonus);
          break;
        }
      }
    }
  }

  carColor.value = "blue";
  scoreStatus.value = "green";
};

const resetGame = () => {
  position.value = { ...initialPosition };
  score.value = 0;
};

const startGame = () => {
  isGameRunning.value = true;
  bonusInterval = setInterval(generateBonus, 3000);
};

const stopGame = () => {
  isGameRunning.value = false;
  clearBonuses();
  clearInterval(bonusInterval);
};

const clearBonuses = () => {
  bonuses.value.length = 0;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});

const returnToMenu = () => {
  isGameRunning.value = false;
  clearBonuses();
  clearInterval(bonusInterval);
  window.removeEventListener("keydown", handleKeydown);
  // eslint-disable-next-line no-undef
  emit("start", "menu");
};
</script>

<style scoped></style>
