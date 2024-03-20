<script setup>
import { defineProps } from "vue";
const props = defineProps({
  pollItem: [Array, Object],
  canEdit: { type: Boolean, default: false },
});
</script>
<template>
  <div
    class="flex gap-2 h-[150px] flex-col scr-m:flex-row scr-m:flex-wrap scr-m:h-[282px] justify-start overflow-y-scroll scr-l:overflow-hidden scr-l:h-max rounded-md"
  >
    <div
      id="item-box"
      class="box-item scr-l:w-[560px] scr-m:h-[80px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
      v-for="(
        { name, picture, discription, isPerTurn, isAttack, ability }, index
      ) in pollItem"
      :key="index"
    >
      <div
        class="w-[35px] rounded-[10px] scr-m:h-[50px] scr-m:w-[50px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
        :class="
          isPerTurn || name === 'Dice+' || name === 'Dice-'
            ? 'bg-isTurn text-White'
            : isAttack
            ? 'bg-Main-pink-300 text-White'
            : 'bg-isPerTurn text-White'
        "
      >
        <img v-if="picture" :src="picture" />
        <p v-show="!picture">{{ name }}</p>
      </div>
      <p
        class="text-hss scr-m:text-hs-tal scr-l:text-[18px] w-[75%] scr-l:w-[65%]"
      >
        <strong>{{ name }}</strong> : {{ discription ? discription : ability }}
      </p>
      <div
        v-if="canEdit"
        class="flex ml-auto gap-1 scr-m:flex-col h-full justify-center items-center scr-m:items-stretch"
      >
        <button
          class="btn btn-xs bg-[#96ff66] hover:bg-[#3e8a1b] text-Black border-0 hover:text-White"
        >
          Edit
        </button>
        <button
          class="btn btn-xs bg-Main-pink-300 hover:bg-Main-pink-200 text-White hover:text-Black border-0"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
