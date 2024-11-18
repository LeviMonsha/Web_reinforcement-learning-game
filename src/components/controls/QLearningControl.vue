<template>
  <div class="relative w-full h-screen bg-gray-200">
    <button @click="startQLearning">Начать обучение</button>
  </div>
</template>

<script setup>
import { watch } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps(["mode"]);

watch(
  () => props.mode,
  (newMode) => {
    if (newMode === "q-learning") {
      console.log("Режим Q-learning активирован");
    }
  }
);

function startQLearning() {
  console.log("Начало обучения Q-learning");
}
</script>

<style scoped></style>
