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

import { ref } from "vue";

const selectPageItem = ref(1);
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
    >
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
            <BackIcon
              class="h-[20px] w-[20px] scr-m:h-[30px] scr-m:w-[30px] scr-l:h-[40px] scr-l:w-[40px]"
            />
            <p class="transition-none">Custom Items</p>
          </button>
        </div>
        <div class="w-1/3 flex justify-end gap-2">
          <button
            class="btn btn-xs text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-max text-Black h-[26px] rounded-full shadow-sm bg-White flex justify-center items-center"
            onclick="categoryItem.showModal()"
            @click="playSoundSFX(soundbtn)"
          >
            Category Items
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
              <nav
                id="navbar-tutorial"
                class="flex pb-2 justify-between items-center"
              >
                <SelectPage
                  v-model="selectPageItem"
                  :name-pages="['Base Items', 'Custom Items']"
                />
                <div class="flex gap-3 text-hss scr-l:text-hs-des">
                  <div class="flex gap-2 src-l:gap-4">
                    <div class="bg-isPerTurn w-4 scr-l:w-8 rounded-[5px]"></div>
                    <p>Item Time</p>
                  </div>
                  <div class="flex gap-2">
                    <div class="bg-isTurn w-4 scr-l:w-8 rounded-[5px]"></div>
                    <p>Item Turn</p>
                  </div>
                  <div class="flex gap-2">
                    <div
                      class="bg-Main-pink-300 w-4 scr-l:w-8 rounded-[5px]"
                    ></div>
                    <p>Item Attack</p>
                  </div>
                </div>
              </nav>

              <ItemsInfo
                v-show="selectPageItem === 1"
                :poll-item="initStructureItem"
              />
              <ItemsInfo v-show="selectPageItem === 2" :poll-item="[]" />
            </template>
          </HowtoPlay>

          <HowtoPlay id="wiki">
            <template #navbar>
              <p>wiki</p>
            </template>
            <template #page></template>
          </HowtoPlay>
        </div>
      </div>
      <div
        id="add-custom-item"
        class="flex-auto flex flex-col scr-m:flex-row items-center flex-warp"
      >
        <div
          class="w-max mx-auto flex flex-col justify-center items-center gap- scr-m:gap-5 scr-l:gap-5"
        >
          <div class="flex justify-center items-center w-max mx-auto">
            <div
              class="w-[88px] h-[88px] scr-m:h-[120px] scr-m:w-[120px] scr-l:h-[150px] scr-l:rounded-[40px] scr-l:w-[150px] bg-White rounded-[20px] shadow-sm flex justify-center items-center"
            >
              <div
                class="h-[80%] w-[80%] bg-Main-pink-300 rounded-[20px] flex text-White scr-l:rounded-[40px] text-hs scr-m:text-hm-tal scr-l:text-hm-des text-center justify-center items-center"
              >
                name
              </div>
            </div>
            <div
              id="selct-type-item"
              class="bg-White rounded-r-[10px] text-hss scr-m:text-hs-tal w-[84px] h-[50px] scr-m:h-[67px] scr-m:w-[110px] shadow-sm flex gap-1 flex-col justify-center"
            >
              <label class="flex items-center text-isPerTurn font-bold gap-1">
                <input
                  type="radio"
                  name="type-item"
                  class="radio radio-error radio-xs scr-m:radio-sm"
                  :value="false"
                  checked
                />
                <span>Item Time</span>
              </label>
              <label class="flex items-center text-isTurn font-bold gap-1">
                <input
                  type="radio"
                  name="type-item"
                  class="radio radio-xs radio-secondary scr-m:radio-sm"
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
              placeholder="Name of Item"
              maxlength="4"
              class="input input-sm scr-m:input-md input-bordered text-hss scr-l:text-hs-des text-Black max-w-xs mt-3 w-full text-center bg-White"
            />
          </div>
        </div>
        <div
          id="marge-items"
          class="w-auto flex flex-col items-center gap-3 scr-m:gap-5 h-auto"
        >
          <div id="select-Items-1">
            <p class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des">
              ITEMS 1
            </p>
            <div
              class="item-bar w-max flex p-1 gap-5 bg-White text-hss scr-l:text-hs-des text-White h-max rounded-[20px]"
            >
              <Item :pollItem="initStructureItem">
                <template
                  #default="{ item: { name, picture, isPerTurn, isAttack } }"
                >
                  <label
                    class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 w-[50px] scr-m:w-[70px] scr-m:h-[70px] rounded-[20px] h-[50px] items-center p-[1px]"
                    :class="
                      isPerTurn || name === 'Dice+' || name === 'Dice-'
                        ? 'bg-isTurn text-White'
                        : isAttack
                        ? 'bg-Main-pink-300 text-White'
                        : 'bg-isPerTurn text-White'
                    "
                  >
                    <input type="checkbox" />
                    <img class="swap-off" :src="picture" />
                    <img class="swap-on" :src="picture" />
                  </label>
                </template>
              </Item>
            </div>
          </div>
          <div id="select-Items-2">
            <p class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des">
              ITEMS 2
            </p>
            <div
              class="item-bar w-max flex p-1 gap-5 bg-White text-hss scr-l:text-hs-des text-White h-max rounded-[20px]"
            >
              <Item :pollItem="initStructureItem">
                <template
                  #default="{ item: { name, picture, isPerTurn, isAttack } }"
                >
                  <label
                    class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 w-[50px] scr-m:w-[70px] scr-m:h-[70px] rounded-[20px] h-[50px] items-center p-[1px]"
                    :class="
                      isPerTurn || name === 'Dice+' || name === 'Dice-'
                        ? 'bg-isTurn text-White'
                        : isAttack
                        ? 'bg-Main-pink-300 text-White'
                        : 'bg-isPerTurn text-White'
                    "
                  >
                    <input type="checkbox" />
                    <img class="swap-off" :src="picture" />
                    <img class="swap-on" :src="picture" />
                  </label>
                </template>
              </Item>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center gap-5 mt-4">
        <ButtonSetting styleType="save" title="Save" />
        <ButtonSetting styleType="cancle" title="Cancle" />
      </div>
    </div>
  </div>
</template>
@/libs/SoundControl ../initStructureItem
