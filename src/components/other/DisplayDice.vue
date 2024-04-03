<script setup>
import roll1 from "/images/dice-1.png";
import roll2 from "/images/dice-2.png";
import roll3 from "/images/dice-3.png";
import roll4 from "/images/dice-4.png";
import roll5 from "/images/dice-5.png";
import roll6 from "/images/dice-6.png";

const diceFace = [roll1, roll2, roll3, roll4, roll5, roll6];
const props = defineProps({
  dices: Array,
});
</script>

<template>
  <img
    v-for="(dice, index) in dices"
    :key="index"
    class="max-h-[54px] scr-m:max-h-[81px] scr-l:max-h-[105px] min-h-0 scr-l:rounded-[30px] rounded-[20px] scr-m:rounded-[30px] shadow-lg"
    :src="diceFace[dice - 1]"
    :alt="'dice' + dice"
  />
</template>

<style scoped></style>
