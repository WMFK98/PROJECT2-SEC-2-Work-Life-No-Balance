<script setup>
const props = defineProps({
  type: String,
  title: String,
  log: String,
});
</script>

<template>
  <dialog :id="type" class="modal">
    <div class="modal-box bg-Yellow-light">
      <h3 class="font-bold text-lg text-center">{{ title }}</h3>
      <p class="py-4 text-center font-bold">{{ log }}</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped></style>
