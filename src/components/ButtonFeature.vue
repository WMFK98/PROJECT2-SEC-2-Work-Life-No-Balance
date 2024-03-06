<script setup>
const props = defineProps({
  size: {
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    },
    default: 'sm'
  },
  variant: {
    validator(value) {
      return ['flat', 'tonal', 'outlined'].includes(value)
    },
    default: 'flat'
  },
  soundbtn: Object
})
</script>

<template>
  <div
    class="flex flex-col p-3"
    :class="[
      size === 'sm' ? 'w-44 h-36' : size === 'md' ? 'w-60 h-52' : 'w-80 h-72',
      variant === 'flat'
        ? 'shadow-md'
        : variant === 'tonal'
        ? 'bg-slate-50'
        : 'border border-slate-300'
    ]"
  >
    <button
      @click=";[reset(), playSound(soundbtn)]"
      class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
    >
      🆕 NEW GAME
    </button>
    <div
      id="btns"
      class="absolute flex flex-col gap-[16px] mt-5 scr-m:mt-20 scr-l:mt-[125px] items-center"
    >
      <button
        :disabled="theWinner"
        @click=";[roll(), playMusicBg(), playSound(soundbtn)]"
        id="btn-roll"
        class="btn w-[75px] scr-m:w-[166px] hover:bg-btn-hover bg-btn-active h-[60px] scr-m:h-max p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:flex-row items-center scr-m:rounded-[30px] scr-l:w-[200px]"
      >
        <p>🎲 ROLL</p>
        <p>DICE</p>
      </button>
      <button
        :disabled="theWinner"
        @click=";[hold(), playSound(soundHold)]"
        id="btn-hold"
        class="btn w-[75px] scr-m:w-[113px] hover:bg-btn-hover scr-m:h-max bg-btn-active h-[60px] p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:rounded-[30px] scr-l:w-[136px]"
      >
        <p>📥 Hold</p>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
