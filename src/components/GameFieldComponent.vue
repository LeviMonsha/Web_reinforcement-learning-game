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
        <div class="game-field">
          <div class="track">
            <div
              class="absolute bg-blue-500"
              :class="`w-${WIDTH_CAR} h-${HEIGHT_CAR}`"
              :style="{ left: position.x + 'px', top: position.y + 'px' }"
            />
          </div>
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

// eslint-disable-next-line no-undef
const props = defineProps(["mode"]);
// eslint-disable-next-line no-undef
const emit = defineEmits(["start"]);
const position = ref({ x: 50, y: 50 });

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
      if (position.value.x < window.innerWidth) position.value.x += SPEED;
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

.game-field {
}

.track {
}

.car {
}
</style>
