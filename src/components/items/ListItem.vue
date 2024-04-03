<script setup>
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../../libs/SoundControl";
const props = defineProps({
  player: Object,
  currentPlayer: Object,
  theWinner: Object,
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <p
      class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des"
      :class="player.items.owner == 'p2' ? 'text-end' : ''"
    >
      ITEMS
    </p>
    <div
      id="items-p2 p-[2px]"
      class="scr-l:w-[480px] w-[300px] h-[45px] rounded-[10px] flex p-1 gap-1 bg-White text-hss scr-m:text-hs-tal scr-l:text-hs-des text-White scr-m:h-[63.49px] scr-m:w-[435.391px] scr-l:h-[71px] scr-m:rounded-[20px]"
      :class="player.items.owner == 'p2' ? 'flex-row-reverse' : ''"
    >
      <div
        v-for="({
          id,
          isUsed,
          itemInfo: { name, picture, isPerTurn, isAttack },
        },index) of player.items.getAllItem()"
        :key="index"
      >
        <label
          class="swap hover:bg-Black hover:text-White swap-rotate text-hss scr-l:text-hs-des scr-m:text-hs-tal item btn btn-sm border-0 rounded-[10px] w-[38px] scr-l:w-[64px] scr-m:w-[57.49px] scr-m:rounded-[20px] h-full items-center p-[1px]"
          :class="
            !(currentPlayer === player) || theWinner
              ? 'bg-btn-hover  text-White'
              : isUsed
              ? 'bg-Yellow-light  text-Black'
              : isPerTurn
              ? 'bg-item-turn text-White'
              : isAttack
              ? 'bg-Main-pink-300 text-White'
              : 'bg-item-time text-White'
          "
          :disabled="!(currentPlayer === player) || theWinner"
        >
          <input
            @click="[player.items.toggleUsedItem(id), playSoundSFX(soundbtn)]"
            type="checkbox"
          />

          <img v-show="picture" class="swap-off" :src="picture" />
          <img v-show="picture" class="swap-on" :src="picture" />

          <p v-show="!picture" class="swap-off">{{ name }}</p>
          <p v-show="!picture" class="swap-on">{{ name }}</p>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
../libs/SoundControl
