<template>
  <div
    @keydown="handleKeyDown"
    class="car"
    :style="{
      width: size + 'px',
      height: size + 'px',
      left: x + 'px',
      top: y + 'px',
    }"
  ></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  props: {
    size: {
      type: Number,
      default: 30,
    },
    speed: {
      type: Number,
      default: 30,
    },
    bonuses: Array,
  },
  emits: ["bonus-collected"],
  setup(props, { emit }) {
    const x = ref(10);
    const y = ref(10);

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "w":
          y.value -= props.speed;
          break;
        case "s":
          y.value += props.speed;
          break;
        case "a":
          x.value -= props.speed;
          break;
        case "d":
          x.value += props.speed;
          break;
      }

      checkForBonuses();
    };

    const checkForBonuses = () => {
      for (const bonus of props.bonuses) {
        if (
          x.value >= bonus.x &&
          x.value <= bonus.x + 20 &&
          y.value >= bonus.y &&
          y.value <= bonus.y + 20
        ) {
          emit("bonus-collected", bonus.id);
          break;
        }
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", handleKeyDown);
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeyDown);
    });

    return { x, y };
  },
};
</script>

<style scoped>
.car {
  background-color: red;
  position: absolute;
}
</style>
