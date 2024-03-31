<script setup>
import { defineProps } from "vue";
const props = defineProps(["player", "theWinner", "isLeft"]);
</script>
<template>
  <div
    :id="`current-point-${player.name}`"
    class="w-[108px] h-[69px] rounded-[20px] flex flex-col justify-center items-center scr-m:h-[101.823px] scr-m:w-[162.763px] scr-l:w-[211px] scr-l:h-[132px]"
    :class="[
      theWinner === player
        ? ' bg-Yellow text-Black'
        : 'bg-Main-pink-300 text-White',
      isLeft
        ? 'scr-m:mr-[170px] mr-[120px] scr-l:mr-[210px]'
        : 'scr-m:ml-[170px] ml-[120px] scr-l:ml-[210px]',
    ]"
  >
    <p class="text-hss scr-m:text-hs-tal scr-l:text-hs-des">CURRENT</p>
    <p class="text-hs scr-l:text-hm-des scr-m:text-hm-tal">
      {{ player.curPoint }}
    </p>
  </div>
</template>
