<script setup>
import { defineProps } from "vue";
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../SoundControl";
const props = defineProps({
  title: String,
  action: Function,
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
        :checked="true"
        @change="[action(), playSoundSFX(soundbtn)]"
      />
      <div class="swap-on">{{ showOn }}</div>
      <div class="swap-off">{{ showOff }}</div>
    </div>
  </label>
</template>

<style scoped></style>
