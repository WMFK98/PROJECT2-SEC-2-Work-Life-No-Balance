<script setup>
import { defineProps } from "vue";
const props = defineProps({ pollItem: [Array, Object] });
</script>
<template>
  <div
    id="item-box"
    class="box-item scr-l:w-[560px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
    v-for="(
      { name, picture, discription, isPerTurn, isAttack }, index
    ) in pollItem"
    :key="index"
  >
    <div
      class="w-[35px] rounded-[10px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
      :class="
        isPerTurn || name === 'Dice+' || name === 'Dice-'
          ? 'bg-isTurn text-White'
          : isAttack
          ? 'bg-Main-pink-300 text-White'
          : 'bg-isPerTurn text-White'
      "
    >
      <img :src="picture" :alt="name" />
    </div>
    <p class="text-hss scr-l:text-hs-des w-[80%]">
      <strong>{{ name }}</strong> : {{ discription }}
    </p>
  </div>
</template>
