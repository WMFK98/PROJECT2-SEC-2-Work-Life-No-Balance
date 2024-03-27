<script setup>
import initStructureItem from "./../initStructureItem";
import Item from "./../components/Item.vue";
import ButtonSetting from "./../components/ButtonSetting.vue";
import BackIcon from "./../assets/Icon/BackIcon.vue";
import ItemsInfo from "./../components/ItemsInfo.vue";
import HowtoPlay from "./../components/HowtoPlay.vue";
import SelectPage from "./../components/SelectPage.vue";
import soundbtn from "/music/soundBtn.mp3";
import ButtonClosePopup from "@/components/ButtonClosePopup.vue";
import { playSoundSFX } from "./../libs/SoundControl";
import SelectItem from "@/components/SelectItem.vue";

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
const removeItems = async (removeId) => {
  
  const statusCode = await deleteItemById(
    import.meta.env.VITE_BASE_URL,
    removeId
  )
  console.log(statusCode)
  if (statusCode === 200)
   
    customItems.value.removePollItem(removeId)
}


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
      class="w-[640px] shadow-lg h-[340px] bg-bgCusItem gap-3 bg-btn-none-active rounded-[20px] flex flex-col scr-m:w-[961.15px] scr-m:h-[550px] scr-l:w-[1246px] scr-l:h-[713px] p-3 scr-m:p-6 scr-m:overflow-hidden overflow-y-scroll scr-l:p-10"
    >
      <div
        id="navbar"
        class="flex justify-between h-max w-full text-Black items-start"
      >
        <div
          class="w-1/3 text-hs scr-m:text-hm-tal scr-l:text-hm-des font-bold flex items-center gap-3"
        >
          <button
            class="group bg-opacity-0 text-Black border-0 shadow-none flex items-center gap-2 w-max h-max"
          >
            <BackIcon
              class="h-[20px] w-[20px] scr-m:h-[30px] scr-m:w-[30px] scr-l:h-[50px] scr-l:w-[50px]"
            />
          </button>
          <SelectPage
            v-model="selectPageItem"
            :name-pages="['Base Items', 'Custom Items']"
          />
        </div>
        <div class="w-1/3 flex justify-end gap-2">
          <button
            class="btn btn-xs text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-max text-Black h-[26px] rounded-full shadow-sm bg-White flex justify-center items-center"
            onclick="categoryItem.showModal()"
            @click="playSoundSFX(soundbtn)"
          >
            ✚ Create Item
          </button>
          <button
            class="btn btn-xs text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-[25px] scr-m:w-[50px] text-Black h-[26px] rounded-full shadow-sm bg-Yellow-light flex justify-center items-center"
            onclick="wiki.showModal()"
            @click="playSoundSFX(soundbtn)"
          >
            𝐢
          </button>

          <HowtoPlay id="categoryItem">
            <template #body>
              <div
                id="navbar"
                class="flex justify-between h-max w-full text-Black items-start"
              >
                <div
                  class="w-1/3 text-hs scr-m:text-hm-tal scr-l:text-hm-des font-bold flex"
                >
                  <button
                    class="group bg-opacity-0 text-Black border-0 shadow-none flex items-center gap-2 w-max h-max"
                  >
                    <p class="transition-none">Custom Item</p>
                  </button>
                </div>
              </div>
              <div
                id="add-custom-item"
                class="flex-auto flex gap-2 items-center flex-warp"
              >
                <div
                  class="w-max mx-auto gap-1 flex flex-col justify-center items-center scr-m:gap-5 scr-l:gap-5"
                >
                  <div class="flex justify-center items-center w-max mx-auto">
                    <div
                      class="w-[88px] h-[88px] scr-m:h-[120px] scr-m:w-[120px] scr-l:h-[150px] scr-l:rounded-[40px] scr-l:w-[150px] bg-White rounded-[20px] shadow-sm flex justify-center items-center"
                    >
                      <div
                        class="h-[80%] w-[80%] bg-Main-pink-300 rounded-[20px] flex text-White scr-l:rounded-[40px] text-hs scr-m:text-hm-tal scr-l:text-hm-des text-center justify-center items-center"
                        :class="isPerTime ? 'bg-isTurn' : ' bg-isPerTurn'"
                      >
                        <span v-if="!itemsName">name</span>
                        <span v-else>{{ itemsName }}</span>
                      </div>
                    </div>

                    <div
                      id="selct-type-item"
                      class="bg-White rounded-r-[10px] text-hss scr-m:text-hs-tal w-[84px] h-[50px] scr-m:h-[67px] scr-m:w-[110px] shadow-sm flex gap-1 flex-col justify-center"
                    >
                      <label
                        class="flex items-center text-isPerTurn font-bold gap-1"
                      >
                        <input
                          type="radio"
                          name="type-item"
                          class="radio radio-error radio-xs scr-m:radio-sm"
                          v-model="isPerTime"
                          :value="false"
                          checked
                        />
                        <span>Item Time</span>
                      </label>
                      <label
                        class="flex items-center text-isTurn font-bold gap-1"
                      >
                        <input
                          type="radio"
                          name="type-item"
                          class="radio radio-xs radio-secondary scr-m:radio-sm"
                          v-model="isPerTime"
                          :value="true"
                          checked
                        />
                        <span>Item Turn</span>
                      </label>
                    </div>
                  </div>

                  <div class="flex justify-center">
                    <input
                      type="text"
                      v-model.trim="itemsName"
                      placeholder="Name of Item"
                      maxlength="4"
                      class="input input-xs scr-m:input-md input-bordered text-hss scr-l:text-hs-des text-Black w-full text-center bg-White"
                    />
                  </div>
                </div>
                <div
                  id="marge-items"
                  class="w-auto flex flex-col items-center gap-3 scr-m:gap-3 mb-2 h-auto"
                >


                  <SelectItem 
                  SItem = "1"
                  v-model="selectedItem1"
                  />
                  <SelectItem 
                  SItem = '2'
                  v-model="selectedItem2"
                  />
                  
                </div>
              </div>
              <!-- <div class="flex justify-center gap-5 mt-4">
          
              </div> -->
            </template>
            <template #btn>
              <div class="flex w-full gap-2 justify-between">
                <ButtonSetting
                  class="w-[49%] scr-l:w-[49%]"
                  styleType="save"
                  title="Save"
                />
                <ButtonClosePopup
                  class="w-[49%] scr-l:w-[49%]"
                ></ButtonClosePopup></div
            ></template>
          </HowtoPlay>
          <HowtoPlay id="wiki">
            <template #navbar>
              <p>wiki</p>
            </template>
          </HowtoPlay>
        </div>
      </div>
      <ItemsInfo
        class="h-full scr-m:h-full scr-l:h-full"
        v-show="selectPageItem === 1"
        :poll-item="initStructureItem"
      />
      <ItemsInfo
        class="h-full scr-m:h-full scr-l:h-full"
        v-show="selectPageItem === 2"
        :poll-item="customItems.getAllTypeItems()"
        :can-edit="true"
        @deleteItems="removeItems"
      />
    </div>
  </div>
</template>
