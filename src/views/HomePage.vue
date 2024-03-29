<script setup>
import ButtonGame from "./../components/ButtonGame.vue";
import logoGame from "/images/logo-game.png";
import amongDice1 from "/images/among-dice-1.png";
import amongDice2 from "/images/among-dice-2.png";
import HowtoPlay from "@/components/HowtoPlay.vue";

import Diceplus from "./../assets/Icon_Dice_1/DicePlus.png";
import DelDice from "./../assets/Icon_Dice_1/DelDice.png";
import DelTenSC from "./../assets/Icon_Dice_1/DelTenSC.png";
import OddAndEven from "./../assets/Icon_Dice_1/ODDEVENT.png";
import SixOneTime from "./../assets/Icon_Dice_1/OneSixTM.png";
import PlusTwo from "./../assets/Icon_Dice_1/PlusTwo.png";
import SqureTwo from "./../assets/Icon_Dice_1/SqureTwo.png";
import {
  getItems,
} from "./../utils/fetchUtils";
import { useCustom } from "@/stores/TypeItemsCusMangement";
import { onMounted} from "vue";


const customItems = useCustom();
onMounted(async () => {
  customItems.addTypeItems(await getItems(import.meta.env.VITE_BASE_URL));
});
</script>
<template>
  <div
    id="bg"
    class="bg-from-inherit w-screen h-screen flex justify-center relative items-center overflow-hidden"
    style="
      background: var(--bg, linear-gradient(297deg, #ff00d6 0%, #ff6b64 65.5%));
    "
  >
    <img
      :src="amongDice2"
      alt="amongDice2"
      class="absolute h-[100%] scale-125 bottom-[-45%] opacity-55"
    />
    <img
      :src="amongDice1"
      alt="amongDice1"
      class="absolute h-[100%] scale-125 bottom-[-50%] animate-fade-up animate-duration-[5000ms] animate-ease-out"
    />
    <img
      :src="SqureTwo"
      alt="amongDice1"
      class="absolute right-[12%] top-[20%] w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-1000"
    />
    <img
      :src="PlusTwo"
      alt="amongDice1"
      class="absolute right-[12%] bottom-[30%] w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-500"
    />

    <img
      :src="Diceplus"
      alt="amongDice1"
      class="absolute left-[12%] top-[20%] w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-800"
    />
    <img
      :src="OddAndEven"
      alt="amongDice1"
      class="absolute top-0 w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-700"
    />
    <img
      :src="DelTenSC"
      alt="amongDice1"
      class="absolute left-[26%] top-0 w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-200"
    />
    <img
      :src="SixOneTime"
      alt="amongDice1"
      class="absolute right-[26%] top-0 w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-300"
    />
    <img
      :src="DelDice"
      alt="amongDice1"
      class="absolute left-[12%] bottom-[30%] w-[10%] animate-jump animate-infinite animate-duration-[20000ms] animate-ease-out animate-delay-100"
    />

    <div class="flex flex-col gap-2 items-center z-10">
      <img
        :src="logoGame"
        alt=""
        class="w-[50%] animate-jump-in animate-once animate-duration-[3000ms] animate-ease-in-out"
      />
      <div class="flex flex-row gap-3 items-center scr-m:flex-col">
        <router-link :to="{ name: 'GamePage' }">
          <ButtonGame
            title="Start Game"
            button-style="normal"
            class="animate-fade-up animate-duration-[2000ms] opacity-0 animate-ease-out animate-normal"
          />
        </router-link>
        <ButtonGame
          title="How to Play"
          button-style="normal"
          class="animate-fade-up animate-duration-[2000ms] opacity-0 animate-delay-500 animate-ease-out animate-normal"
          onclick="HowToPlay.showModal()"
        />

        <HowtoPlay id="HowToPlay" />
        <router-link :to="{ name: 'CustomItem' }">
          <ButtonGame
            title="Custom Item"
            button-style="normal"
            class="animate-fade-up animate-duration-[2000ms] opacity-0 animate-delay-500 animate-ease-out animate-normal"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>
