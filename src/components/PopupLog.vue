<script setup>
const props = defineProps({
  type: String,
  log: String,
});
</script>

<template>
  <dialog :id="type" class="modal">
    <div class="modal-box bg-[#FFE68E]">
      <h3 class="font-bold text-lg text-center">{{ log }}</h3>
      <p class="py-4 text-center font-bold">Invalid Value! Please try again.</p>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped></style>
