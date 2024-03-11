<script setup>
import { defineProps } from "vue";

const props = defineProps([
  "player",
  "theWinner",
  "currentPlayer",
  "isPlaySoundSF",
]);
</script>
<template>
  <div
    id="controller-p1"
    class="w-1/2 flex flex-col px-3 py-5 scr-l:pb-[64px] scr-l:pr-[29px] scr-l:pl-[93px] gap-[35px] scr-m:gap-[70px] justify-end"
    :class="
      theWinner === player
        ? 'bg-Black'
        : currentPlayer[0] === player
        ? 'bg-Main-pink-100'
        : 'bg-Main-pink-200'
    "
  >
    <slot name="currentPoint"></slot>
    <!-- <div
      id="cp-p1"
      class="ml-[47px] scr-l:ml-0 mr-auto w-[108px] h-[69px] rounded-[20px] flex flex-col justify-center items-center scr-m:h-[101.823px] scr-m:w-[162.763px] scr-l:w-[211px] scr-l:h-[132px]"
      :class="
        theWinner === player
          ? ' bg-Yellow text-Black'
          : 'bg-Main-pink-300 text-White'
      "
    >
      <p class="text-hss scr-m:text-hs-tal scr-l:text-hs-des">CURRENT</p>
      <p class="text-hs scr-l:text-hm-des scr-m:text-hm-tal">
        {{ player.curPoint }}
      </p>
    </div> -->
    <div class="flex flex-col gap-1">
      <slot name="itemsBar"></slot>
      <!-- <p class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des">ITEMS</p> -->

      <!-- <div
        id="items-p1 p-[2px]"
        class="max-w-auto h-[45px] rounded-[10px] flex p-1 gap-1 bg-White text-hss scr-m:text-hs-tal scr-l:text-hs-des text-White scr-m:h-[63.49px] scr-l:h-[71px] scr-m:rounded-[20px]"
      >
        <label
          v-for="{
            id,
            isUsed,
            itemInfo: { name, isPerTurn, isAttack, picture },
          } in player.items.getAllItem()"
          :key="id"
          class="swap swap-rotate item btn text-hss scr-l:text-hs-des scr-m:text-hs-tal btn-sm border-0 rounded-[10px] w-[38px] scr-l:w-[64px] scr-m:w-[57.49px] scr-m:rounded-[20px] h-auto items-center p-[1px]"
          :class="
            !(currentPlayer[0] === player) || theWinner
              ? 'bg-btn-hover  text-White'
              : isUsed
              ? 'bg-Yellow-light  text-Black'
              : isPerTurn || name === 'Dice+' || name === 'Dice-'
              ? 'bg-isTurn text-White'
              : isAttack
              ? 'bg-Main-pink-300 text-White'
              : 'bg-isPerTurn text-White'
          "
        >
          <input
            @click="player.items.toggleUsedItem(id, isPlaySoundSF)"
            type="checkbox"
            :disabled="!(currentPlayer[0] === player) || theWinner"
          />
          <img class="swap-off" :src="picture" />
          <img class="swap-on" :src="picture" />
        </label>
      </div> -->
    </div>
  </div>
</template>
