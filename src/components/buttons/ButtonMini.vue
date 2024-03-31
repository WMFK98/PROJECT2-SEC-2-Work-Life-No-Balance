<script setup>
import { playSoundSFX } from "@/libs/SoundControl";
import soundbtn from "/music/soundBtn.mp3";
defineProps({ title: String });
</script>
<template>
  <button
    id="btn-tutorial"
    class="z-20 bg-Yellow-light px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs border-0 scr-m:h-[39px] scr-m:w-max scr-m:px-[15px] scr-m:rounded-[30px] scr-l:h-[50px]"
    onclick="tutorial.showModal()"
    @click="playSoundSFX(soundbtn)"
  >
    {{ title }}
  </button>
</template>
