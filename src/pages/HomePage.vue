<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold mb-8">Выберите режим игры</h1>
    <div class="flex space-x-4">
      <button
        @click="startGame('manual')"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ручное управление
      </button>
      <button
        @click="startGame('q-learning')"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Q-learning
      </button>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(["start"]);

const startGame = (mode) => {
  emit("start", mode);
};
</script>

<style scoped></style>
