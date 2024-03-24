<script setup>
import initStructureItem from "./../initStructureItem";
import Item from "./../components/Item.vue";
import ButtonSetting from "./../components/ButtonSetting.vue";
import BackIcon from "./../assets/Icon/BackIcon.vue";
import ItemsInfo from "./../components/ItemsInfo.vue";
import HowtoPlay from "./../components/HowtoPlay.vue";
import SelectPage from "./../components/SelectPage.vue";
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../libs/SoundControl";

import { onMounted, ref } from "vue";
const selectPageItem = ref(1);
const customItems = ref(new TypeItemsCusMangement());
import {
  addItem,
  deleteItemById,
  editItem,
  getItemById,
  getItems,
} from "./../utils/fetchUtils";
import TypeItemsCusMangement from "@/libs/TypeItemsCusMangement";

onMounted(async () => {
  customItems.value.addTypeItems(await getItems(import.meta.env.VITE_BASE_URL));
});

const selectedItem1 = ref("");
const selectedItem2 = ref("");
const itemsName = ref("");
const isPerTime = ref(true);
</script>

<template>
  <div
    id="bg"
    class="bg-from-inherit w-screen h-screen flex justify-center items-center overflow-hidden"
    style="
      background: var(--bg, linear-gradient(297deg, #ff00d6 0%, #ff6b64 65.5%));
    "
  >
    <div
      id="board"
      class="w-[640px] shadow-lg h-[340px] bg-bgCusItem bg-btn-none-active rounded-[20px] flex flex-col scr-m:overflow-hidden scr-m:w-[961.15px] scr-m:h-[550px] scr-l:w-[1246px] scr-l:h-[713px] p-3 scr-m:p-6 overflow-y-scroll scr-l:p-10"
    ></div>
  </div>
</template>
