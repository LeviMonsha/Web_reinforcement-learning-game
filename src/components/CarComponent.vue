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
  emits: ["bonus-collected", "collision-check"],

  setup(props, { emit }) {
    const x = ref(30);
    const y = ref(30);

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

      checkCollisions();
      checkForBonuses();
    };

    const checkCollisions = () => {
      const canvas = document.querySelector("canvas");

      if (!canvas) return;

      const context = canvas.getContext("2d");

      // Проверка на белую линию под машиной
      const isWhitePixel = (data) =>
        data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] > 0;

      for (let i = 0; i < props.size; i++) {
        for (let j = 0; j < props.size; j++) {
          const imageData = context.getImageData(
            x.value + i,
            y.value + j,
            1,
            1
          );

          if (isWhitePixel(imageData.data)) {
            alert("WHITE");
            emit("collision-check"); // Эмитируем событие о завершении игры
            return;
          }
        }
      }
    };

    const checkForBonuses = () => {
      for (const bonus of props.bonuses) {
        if (
          x.value >= bonus.x &&
          x.value <= bonus.x + bonus.size &&
          y.value >= bonus.y &&
          y.value <= bonus.y + bonus.size
        ) {
          console.log(`Bonus collected! Size: ${bonus.size}`);
          emit("bonus-collected", bonus); // Эмитируем событие о сборе бонуса с объектом бонуса
          break; // Выход из цикла после нахождения первого совпадения
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
