<script setup>
import { defineProps, } from "vue";

const props = defineProps(["player", "theWinner", "currentPlayer","isPlaySoundSF"]);

</script>
<template>

  <div
          id="display-p1"
          class="w-[204.944px] scr-m:w-[307.78px] scr-l:w-[400px] shadow-xl rounded-tr-[20px] flex flex-col justify-center items-center pt-[15px]"
          :class="[
            theWinner === player
              ? 'bg-Black'
              : currentPlayer[0] === player
              ? 'bg-Main-pink-100'
              : 'bg-Main-pink-200'
            ]"
        >
          <h2
            class="text-hm scr-m:text-hm-tal scr-l:text-hm-des"
            :class="theWinner === player ? 'text-Yellow' : 'text-Black'"
          >
            PLAYER 1
          </h2>
          <h1
            class="text-hl scr-m:text-hl-tal scr-l:text-hl-des"
            :class="
              theWinner === player ? 'text-Yellow' : 'text-Main-pink-300'
            "
          >
            {{ player.point }}
          </h1>
        </div>
 

  
</template>
