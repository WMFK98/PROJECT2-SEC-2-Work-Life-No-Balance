<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  modelValue: Boolean,
  showOn: String,
  showOff: String,
});
</script>

<template>
  <label class="flex gap-2 cursor-pointer">
    <p>{{ title }} :</p>
    <div class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />

      <div class="swap-on">{{ showOn }}</div>
      <div class="swap-off">{{ showOff }}</div>
    </div>
  </label>
</template>

<style scoped></style>
