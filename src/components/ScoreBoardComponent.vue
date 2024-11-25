<template>
  <div
    class="absolute bg-black top-5 right-5 mt-5"
    :class="{
      'text-red-500': status === 'red',
      'text-green-500': status !== 'red',
    }"
  >
    <h4 class="text-lg">
      {{ statusMessage }}
    </h4>
  </div>
</template>

<script>
export default {
  props: ["score", "status"],
  computed: {
    statusMessage() {
      return this.status === "red"
        ? "Машинка задевает линию"
        : "Машинка не задевает линию";
    },
  },
};
</script>
