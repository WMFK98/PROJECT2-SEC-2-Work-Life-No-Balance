<script setup>
const props = defineProps({
  SItem: String,
  modelValue: String,
  items: Array,
});
</script>

<template>
  <div id="select-Items-1">
    <p class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des">
      ITEMS {{ props.SItem }}
    </p>
    <div
      class="item-bar w-max flex p-1 gap-1 bg-White text-hss scr-l:text-hs-des scr-l:gap-8 text-White h-max rounded-[20px]"
    >
      <div v-for="{ name, picture, isPerTurn, isAttack } of items">
        <label
          class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 w-[50px] scr-m:w-[70px] scr-m:h-[70px] rounded-[20px] h-[50px] items-center p-[1px]"
          :class="
            modelValue === name
              ? 'bg-Yellow-light'
              : isPerTurn || name === 'Dice+' || name === 'Dice-'
              ? 'bg-item-turn text-White'
              : isAttack
              ? 'bg-Main-pink-300 text-White'
              : 'bg-item-time text-White'
          "
        >
          <input
            :value="name"
            @click="$emit('update:modelValue', $event.target.value)"
            type="checkbox"
          />

          <img class="swap-off" :src="picture" />
          <img class="swap-on" :src="picture" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
