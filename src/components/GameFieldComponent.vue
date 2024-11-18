<template>
  <div
    class="flex items-center justify-center h-screen bg-gray-900"
    @keydown="handleKeydown"
    tabindex="0"
  >
    <div
      class="tv-container relative w-full h-full max-w-4xl max-h-3xl bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div class="tv-screen bg-black rounded-lg border-4 border-gray-600">
        <TrackCanvasComponent
          @lineDrawn="checkColorUnderCar"
          :width="screenWidth"
          :height="screenHeight"
        />
        <div class="game-field">
          <div
            class="car absolute"
            :class="`w-${WIDTH_CAR} h-${HEIGHT_CAR}`"
            :style="{
              left: position.x + 'px',
              top: position.y + 'px',
              backgroundColor: carColor,
            }"
          />
        </div>
      </div>

      <div
        class="tv-controls absolute bottom-0 left-0 right-0 p-4 flex justify-between bg-gray-700"
      >
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
import { ref, onMounted } from "vue";
import { WIDTH_CAR, HEIGHT_CAR, SPEED } from "../constants.js";
import TrackCanvasComponent from "./TrackCanvasComponent.vue";

const position = ref({ x: 50, y: 50 });
const carColor = ref("blue");
// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps(["mode"]);
// eslint-disable-next-line no-undef
const emit = defineEmits(["start"]);

const moveCar = (direction) => {
  switch (direction) {
    case "up":
      if (position.value.y > 0) position.value.y -= SPEED;
      break;
    case "down":
      if (position.value.y < window.innerHeight * 0.7)
        position.value.y += SPEED;
      break;
    case "left":
      if (position.value.x > 0) position.value.x -= SPEED;
      break;
    case "right":
      if (position.value.x < window.innerWidth * 0.5) position.value.x += SPEED;
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

const checkColorUnderCar = () => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  const corners = [
    { x: position.value.x, y: position.value.y },
    { x: position.value.x + WIDTH_CAR, y: position.value.y },
    { x: position.value.x + WIDTH_CAR, y: position.value.y + HEIGHT_CAR },
    { x: position.value.x, y: position.value.y + HEIGHT_CAR },
    {
      x: position.value.x + WIDTH_CAR / 2,
      y: position.value.y + HEIGHT_CAR / 2,
    },
  ];

  for (const corner of corners) {
    const imageData = context.getImageData(corner.x, corner.y, 1, 1);
    const data = imageData.data;

    const r = data[0];
    const g = data[1];
    const b = data[2];
    const a = data[3];

    if (r === 255 && g === 255 && b === 255 && a > 0) {
      carColor.value = "red";
      return;
    }
  }

  const fullImageData = context.getImageData(
    position.value.x,
    position.value.y,
    WIDTH_CAR,
    HEIGHT_CAR
  );
  const fullData = fullImageData.data;

  for (let i = 0; i < fullData.length; i += 4) {
    const r = fullData[i];
    const g = fullData[i + 1];
    const b = fullData[i + 2];
    const a = fullData[i + 3];

    if (r === 255 && g === 255 && b === 255 && a > 0) {
      carColor.value = "red";
      return;
    }
  }

  carColor.value = "blue";
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

const returnToMenu = () => {
  // eslint-disable-next-line no-undef
  emit("start", "menu");
};
</script>

<style scoped>
.tv-screen {
  height: 80%;
}
.car {
}
</style>
