<template>
  <div
    class="relative w-full h-screen bg-gray-200"
    @keydown="handleKeydown"
    tabindex="0"
  >
    <div
      class="absolute bg-blue-500 w-10 h-10"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const emit = defineEmits(["move"]);
const position = ref({ x: 50, y: 50 });

const handleKeydown = (event) => {
  switch (event.key) {
    case "w":
      emit("move", "up");
      break;
    case "s":
      emit("move", "down");
      break;
    case "a":
      emit("move", "left");
      break;
    case "d":
      emit("move", "right");
      break;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
</script>

<style scoped></style>
