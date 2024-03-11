<script setup>
import ItemComponent from "./Item.vue";
const props = defineProps({
  player: Object,
  currentPlayer: Array,
  isPlaySoundSF: Boolean,
  theWinner: [Object, Array],
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
      class="scr-l:w-[480px] w-[300px] h-[45px] rounded-[10px] flex p-1 gap-1 bg-White text-hss scr-m:text-hs-tal scr-l:text-hs-des text-White scr-m:h-[63.49px] scr-l:h-[71px] scr-m:rounded-[20px]"
      :class="player.items.owner == 'p2' ? 'flex-row-reverse' : ''"
    >
      <ItemComponent :pollItem="player.items.getAllItem()">
        <template
          #default="{
            item: {
              id,
              isUsed,
              itemInfo: { picture, isPerTurn, isAttack },
            },
          }"
        >
          <label
            class="swap swap-rotate text-hss scr-l:text-hs-des scr-m:text-hs-tal item btn btn-sm border-0 rounded-[10px] w-[38px] scr-l:w-[64px] scr-m:w-[57.49px] scr-m:rounded-[20px] h-auto items-center p-[1px]"
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
        </template>
      </ItemComponent>
    </div>
  </div>
</template>

<style scoped></style>
