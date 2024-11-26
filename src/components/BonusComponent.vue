<template>
  <div
    class="absolute bg-yellow-500"
    :style="{
      width: '20px',
      height: '20px',
      top: y + 'px',
      left: x + 'px',
    }"
  ></div>
</template>

<script>
export default {
  props: {
    x: Number,
    y: Number,
  },
};
</script>
