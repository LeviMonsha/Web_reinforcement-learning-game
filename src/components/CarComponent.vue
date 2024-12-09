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
      default: 50,
    },
    speed: {
      type: Number,
      default: 10,
    },
    bonuses: Array,
    screenWidth: Number,
    screenHeight: Number,
  },
  emits: ["bonus-collected", "check-collision"],
  setup(props, { emit }) {
    const x = ref(10);
    const y = ref(10);

    const handleKeyDown = (event) => {
      let newX = x.value;
      let newY = y.value;

      switch (event.key) {
        case "w":
          newY -= props.speed;
          break;
        case "s":
          newY += props.speed;
          break;
        case "a":
          newX -= props.speed;
          break;
        case "d":
          newX += props.speed;
          break;
      }

      if (newX < 0) newX = 0;
      if (newX > props.screenWidth - props.size)
        newX = props.screenWidth - props.size;
      if (newY < 0) newY = 0;
      if (newY > props.screenHeight - props.size)
        newY = props.screenHeight - props.size;

      x.value = newX;
      y.value = newY;

      emit("check-collision", { x: x.value, y: y.value });

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
          emit("bonus-collected", { x: x.value, y: y.value });
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
