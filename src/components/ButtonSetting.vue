<script setup>
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../SoundControl";
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
    class="btn-save btn text-White border-0 btn-close scr-l:w-[25%] scr-l:rounded-[20px] rounded-[10px] w-[70px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m"
    :class="
      styleType === 'save'
        ? 'hover:bg-[#96ff66]  bg-[#3e8a1b] hover:text-Black'
        : styleType === 'close' ? 'bg-Main-pink-300  hover:bg-Main-pink-100 hover:text-Black' : 'hover:bg-[#96ff66]  bg-[#3e8a1b] hover:text-Black'
    "
    id="saveButton"
    @click="[action(), playSoundSFX(soundbtn)]"  
  >
    {{ title }}
  </button>
</template>

<style scoped></style>
