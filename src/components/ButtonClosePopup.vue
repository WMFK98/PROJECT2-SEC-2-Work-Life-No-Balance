<script setup>
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../libs/SoundControl";
defineProps({
  text: {
    type: String,
    default: "Close",
  },
});
</script>

<template>
  <form method="dialog" class="justify-center flex w-auto">
    <button
      class="btn-close hover:bg-Main-pink-200 w-full scr-m:btn-sm scr-l:btn-md btn-xs bg-Main-pink-300 text-hss scr-l:text-hs-des bold text-White rounded-[10px] h-[25px] flex justify-center items-center scr-l:rounded-[20px]"
      id="cancelButton"
      @click="playSoundSFX(soundbtn)"
    >
      {{ text }}
    </button>
  </form>
</template>

<style scoped></style>
