<script setup>
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../libs/SoundControl";
const props = defineProps({
  title: String,
  action: Function,
  styleType: {
    type: String,
    varlidatior(value) {
      return ["save", "close"].includes(value);
    },
  },
});
</script>

<template>
  <button
    class="btn-save btn border-0 btn-close scr-l:w-[40%] scr-m:btn-sm scr-l:btn-md scr-l:rounded-[20px] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-l:btn-m"
    :class="
      styleType === 'save'
        ? 'hover:bg-btn-save-hover  bg-btn-save text-White hover:text-Black'
        : styleType === 'close'
        ? 'bg-Main-pink-300  hover:bg-Main-pink-100 text-White hover:text-Black'
        : 'hover:bg-Main-blue-100 hover:bg-White  text-White  bg-Black  hover:text-Black'
    "
    id="saveButton"
    @click="[action(), playSoundSFX(soundbtn)]"
  >
    {{ title }}
  </button>
</template>

<style scoped></style>
../libs/SoundControl
