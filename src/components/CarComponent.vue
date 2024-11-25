<template>
  <div
    class="car absolute"
    :class="`w-${WIDTH_CAR} h-${HEIGHT_CAR}`"
    :style="{
      left: position.x + 'px',
      top: position.y + 'px',
      backgroundColor: color,
    }"
  />
</template>

<script setup>
import { defineProps } from "vue";
import { SPEED, WIDTH_CAR, HEIGHT_CAR } from "@/constants";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    default: SPEED,
  },
  position: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
    default: "blue",
  },
});
</script>

<style scoped></style>
