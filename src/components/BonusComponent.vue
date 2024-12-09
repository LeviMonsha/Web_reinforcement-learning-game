<template>
  <div
    class="bonus"
    :style="{
      width: size + 'px',
      height: size + 'px',
      left: x + 'px',
      top: y + 'px',
    }"
    @click="collect"
  ></div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    size: {
      type: Number,
      default: 30,
    },
  },
  emits: ["bonus-collected"],
  setup(_, { emit }) {
    const x = ref(Math.random() * (800 - 30));
    const y = ref(Math.random() * (600 - 30));

    const collect = () => {
      emit("bonus-collected");
      x.value = Math.random() * (800 - 30);
      y.value = Math.random() * (600 - 30);
    };

    return { x, y, collect };
  },
};
</script>

<style scoped>
.bonus {
  background-color: gold;
  position: absolute;
}
</style>
