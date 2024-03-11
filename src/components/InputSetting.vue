<script setup>
const props = defineProps({
  title: String,
  modelValue: [Number, String],
});
</script>

<template>
  <p class="flex justify-between">
    {{ title }}
    <input
      class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </p>
</template>

<style scoped></style>
