<script setup>
import soundbtn from "/music/soundBtn.mp3";
import { toggleSoundSFX } from "./../libs/SoundControl";
</script>

<template>
  <form method="dialog" class="justify-center flex w-full px-10">
    <button
      class="btn-close hover:bg-Main-pink-200 scr-l:btn-md btn-xs scr-l:w-[200px] bg-Main-pink-300 text-hss w-full scr-l:text-hs-des bold text-White rounded-[10px] h-[25px] flex justify-center items-center scr-l:rounded-[20px]"
      id="cancelButton"
      @click="toggleSoundSFX(soundbtn)"
    >
      Close
    </button>
  </form>
</template>

<style scoped></style>
