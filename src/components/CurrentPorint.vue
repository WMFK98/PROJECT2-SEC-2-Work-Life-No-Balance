<script setup>
import { defineProps } from "vue";
defineProps({
    player:any{}


});
</script>
<template>
  <div
    id="cp-p1"
    class="ml-[47px] scr-l:ml-0 mr-auto w-[108px] h-[69px] rounded-[20px] flex flex-col justify-center items-center scr-m:h-[101.823px] scr-m:w-[162.763px] scr-l:w-[211px] scr-l:h-[132px]"
    :class="
      theWinner === player1
        ? ' bg-Yellow text-Black'
        : 'bg-Main-pink-300 text-White'
    "
  >
    <p class="text-hss scr-m:text-hs-tal scr-l:text-hs-des">CURRENT</p>
    <p class="text-hs scr-l:text-hm-des scr-m:text-hm-tal">
      {{ player1.curPoint }}
    </p>
  </div>
</template>
