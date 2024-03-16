<script setup>
import { defineProps } from "vue";
import { playSoundSFX, playSoundMusic } from "@/SoundControl";
import backgroundMusic from "/music/backgroundMusic.mp3";
const props = defineProps({
  title: String,
  action: Function,
  theWinner: [Object, Array],
  soundSFX: String,
  buttonStyle: {
    type: String,
    define(value) {
      return ["normal", "short", "static"].includes(value);
    },
  },
});
</script>

<template>
  <button
    @click="
      [action(), playSoundSFX(props.soundSFX), playSoundMusic(backgroundMusic)]
    "
    class="px-2 text-hss p-0 scr-m:h-max scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:rounded-[30px] scr-l:h-[50px]"
    :class="
      buttonStyle === 'short'
        ? ' scr-m:w-[113px] scr-l:w-[136px] w-[75px] h-[60px]'
        : buttonStyle === 'normal'
        ? ' scr-m:w-[166px] scr-m:flex-row items-center scr-l:w-[200px] w-[75px] h-[60px]'
        : 'w-max h-max items-center scr-l:w-[200px] scr-m:w-[166px]'
    "
    :disabled="theWinner !== null"
  >
    {{ title }}
  </button>
</template>
