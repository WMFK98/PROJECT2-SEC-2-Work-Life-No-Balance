<script setup>
import { defineProps } from "vue";

const props = defineProps({
  player: Object,
  theWinner: Object,
  currentPlayer: Object,
});
</script>
<template>
  <div
    id="controller-p1"
    class="w-1/2 flex flex-col px-3 py-5 scr-m:pb-[42px] scr-l:pb-[64px] items-center gap-[50px] scr-m:gap-[100px] justify-end"
    :class="
      theWinner === player
        ? 'bg-Black'
        : currentPlayer === player
        ? 'bg-Main-pink-100'
        : 'bg-Main-pink-200'
    "
  >
    <slot name="currentPoint"></slot>

    <div class="flex flex-col gap-1">
      <slot name="items-bar">
        <p>item is emply</p>
      </slot>
    </div>
  </div>
</template>
