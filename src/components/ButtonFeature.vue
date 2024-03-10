<script setup>
import soundHold from '/music/holdsound.mp3'
import soundbtn from '/music/soundBtn.mp3'
import backgroundMusic from '/music/backgroundMusic.mp3'
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  action: Function,
  playSound: Function,
  playMusicBg: Function,
  theWinner: Object,
  buttonShow: {
    type: String,
    define(value) {
      return ['btns', 'btn-roll', 'btn-hold'].includes(value)
    }
  }
})
</script>

<template>
  <button
    @click=";[action(), playSound(), playMusicBg()]"
    class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
    :class="
      buttonShow === btns
        ? 'btn w-[75px] scr-m:w-[166px] hover:bg-btn-hover bg-btn-active h-[60px] scr-m:h-max p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:flex-row items-center scr-m:rounded-[30px] scr-l:w-[200px]'
        : 'btn w-[75px] scr-m:w-[113px] hover:bg-btn-hover scr-m:h-max bg-btn-active h-[60px] p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:rounded-[30px] scr-l:w-[136px]'
    "
  >
    {{ title }}
  </button>
  <!-- <button
    v-if="buttonShow === 'btns'"
    @click=";[reset(), playSound(soundbtn)]"
    class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
  >
    🆕 NEW GAME
  </button>

  <button
    v-if="buttonShow === 'btn-roll'"
    :disabled="theWinner"
    @click=";[roll(), playMusicBg(), playSound(soundbtn)]"
    id="btn-roll"
    class="btn w-[75px] scr-m:w-[166px] hover:bg-btn-hover bg-btn-active h-[60px] scr-m:h-max p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:flex-row items-center scr-m:rounded-[30px] scr-l:w-[200px]"
  >
    <p>🎲 ROLL</p>
    <p>DICE</p>
  </button>

  <button
    v-if="buttonShow === 'btn-hold'"
    :disabled="theWinner"
    @click=";[hold(), playSound(soundHold)]"
    id="btn-hold"
    class="btn w-[75px] scr-m:w-[113px] hover:bg-btn-hover scr-m:h-max bg-btn-active h-[60px] p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:rounded-[30px] scr-l:w-[136px]"
  >
    <p>📥 Hold</p>
  </button> -->
</template>

<style scoped></style>
