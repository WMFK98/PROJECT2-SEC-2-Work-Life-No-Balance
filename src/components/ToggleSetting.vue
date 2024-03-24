<script setup>
import { defineProps } from "vue";
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../libs/SoundControl";

const emits = defineEmits(["update"]);
const props = defineProps({
  title: String,
  action: Function,
  showOn: String,
  showOff: String,
  openSound: Boolean,
});

const handleClick = () => {
  props.action();
  playSoundSFX(soundbtn);
  emitUpdateEvent();
};

const emitUpdateEvent = () => {
  emits("update", { openSound: !props.openSound });
};
</script>

<template>
  <label class="flex gap-2 w-max cursor-pointer">
    <p>{{ title }} :</p>
    <div class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des">
      <input type="checkbox" :checked="!openSound" @change="handleClick" />
      <div class="swap-on">{{ showOn }}</div>
      <div class="swap-off">{{ showOff }}</div>
    </div>
  </label>
</template>

<style scoped></style>
../libs/SoundControl
