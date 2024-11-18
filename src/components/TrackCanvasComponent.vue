<template>
  <button class="text-white" @click="clearCanvas">
    <BeakerIcon class="size-6 text-blue-500" />
  </button>
  <canvas
    ref="canvas"
    @mousedown="startDrawing"
    @mouseup="stopDrawing"
    @mousemove="draw"
    :width="800"
    :height="600"
    style="border: 1px solid #000"
  ></canvas>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BeakerIcon } from "@heroicons/vue/24/solid";

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps(["width", "height"]);
// eslint-disable-next-line no-undef, no-unused-vars
const emit = defineEmits(["lineDrawn"]);
const canvas = ref(null);
const isDrawing = ref(false);
const context = ref(null);
const lastX = ref(0);
const lastY = ref(0);

onMounted(() => {
  context.value = canvas.value.getContext("2d");
});

function startDrawing(event) {
  isDrawing.value = true;
  [lastX.value, lastY.value] = [event.offsetX, event.offsetY];
}

function stopDrawing() {
  isDrawing.value = false;
  context.value.beginPath();
}

function draw(event) {
  if (!isDrawing.value) return;

  context.value.strokeStyle = "white";
  context.value.lineWidth = 8;
  context.value.beginPath();
  context.value.moveTo(lastX.value, lastY.value);
  context.value.lineTo(event.offsetX, event.offsetY);
  context.value.stroke();

  [lastX.value, lastY.value] = [event.offsetX, event.offsetY];
}

function clearCanvas() {
  context.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
}
</script>

<style scoped>
canvas {
  cursor: crosshair;
}
</style>
