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
    class="w-1/2 flex flex-col px-3 py-5 scr-m:pb-[42px] scr-l:pb-[64px] items-center gap-[50px] scr-m:gap-[100px] justify-end"
    :class="
      theWinner === player
        ? 'bg-Black'
        : currentPlayer[0] === player
        ? 'bg-Main-pink-100'
        : 'bg-Main-pink-200'
    "
  >
    <slot name="currentPoint"></slot>

    <div class="flex flex-col gap-1">
      <slot name="items-bar">
        <div
          id="items-p1 p-[2px]"
          class="scr-l:w-[480px] w-auto h-[45px] rounded-[10px] flex p-1 gap-1 bg-White text-hss scr-m:text-hs-tal scr-l:text-hs-des text-White scr-m:h-[63.49px] scr-l:h-[71px] scr-m:rounded-[20px]"
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
              !(currentPlayer === player) || theWinner
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
              :disabled="!(currentPlayer === player) || theWinner"
            />
            <img class="swap-off" :src="picture" />
            <img class="swap-on" :src="picture" />
          </label>
        </div>
      </slot>
    </div>
  </div>
</template>
