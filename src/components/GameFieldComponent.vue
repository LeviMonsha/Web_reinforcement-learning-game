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
import { ref } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps(["mode"]);
const position = ref({ x: 50, y: 50 });
const speed = 10;

const handleKeydown = (event) => {
  if (props.mode === "manual") {
    switch (event.key) {
      case "w":
        position.value.y -= speed;
        break;
      case "s":
        position.value.y += speed;
        break;
      case "a":
        position.value.x -= speed;
        break;
      case "d":
        position.value.x += speed;
        break;
    }
  }
};

window.addEventListener("keydown", handleKeydown);
</script>

<style scoped></style>
