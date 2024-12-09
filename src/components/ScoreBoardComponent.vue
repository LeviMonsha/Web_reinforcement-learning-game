<template>
  <div class="absolute bg-black top-5 right-5 mt-5">
    <p class="text-white">Очки: {{ score }}</p>
    <p class="text-white">Время: {{ time }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  score: Number,
  time: Number,
});
</script>
