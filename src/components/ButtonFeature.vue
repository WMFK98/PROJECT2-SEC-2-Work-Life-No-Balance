<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  style: String,
  action: Function,
  playSound: Function,
  playBackground: Function,
  theWinner: [Object, Array],
  buttonStyle: {
    type: String,
    define(value) {
      return ['btnNew', 'btnRoll', 'btnHold'].includes(value)
    }
  }
})
</script>

<template>
  <button
    @click=";[action(), playSound(), playBackground()]"
    :style="style"
    class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
    :class="
      buttonStyle === 'btnRoll'
        ? 'btn w-[75px] scr-m:w-[113px] hover:bg-btn-hover scr-m:h-max bg-btn-active h-[60px] p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:rounded-[30px] scr-l:w-[136px]'
        : 'btn w-[75px] scr-m:w-[166px] hover:bg-btn-hover bg-btn-active h-[60px] scr-m:h-max p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:flex-row items-center scr-m:rounded-[30px] scr-l:w-[200px]'
    "
    :disabled="theWinner !== null && theWinner !== undefined"
  >
    {{ title }}
  </button>
</template>

<style scoped></style>
