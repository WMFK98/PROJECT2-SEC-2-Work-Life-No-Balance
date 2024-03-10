<script setup>
const props = defineProps({
  title: String,
  setting: Object,
});
</script>

<template>
  <p class="flex justify-between">
    {{ title }}
    <input
      class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
      type="text"
      :v-model="setting"
    />
  </p>
</template>

<style scoped></style>
