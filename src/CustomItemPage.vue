<script setup>
import initIStructureitem from "./initIStructureitem";
import Item from "./components/Item.vue";
import ButtonSetting from "./components/ButtonSetting.vue";
import BackIcon from "./assets/Icon/BackIcon.vue";
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
      class="w-[640px] shadow-lg h-[340px] bg-bgCusItem bg-btn-none-active rounded-[20px] flex flex-col overflow-hidden scr-m:w-[961.15px] scr-m:h-[550px] scr-l:w-[1246px] scr-l:h-[713px] p-3 overflow-y-scroll"
    >
      <div
        id="display"
        class="flex justify-between h-[135px] w-full text-Black items-start"
      >
        <div class="w-1/3 text-hs font-bold flex">
          <div class="flex items-center gap-2">
            <BackIcon class="h-[20px] w-[20px]" />
            <p>Custom Items</p>
          </div>
        </div>
        <div class="w-1/3 flex justify-center items-center">
          <div
            class="w-[88px] h-[88px] bg-White rounded-[20px] shadow-sm flex justify-center items-center"
          >
            <div
              class="h-[80%] w-[80%] bg-Main-pink-300 rounded-[20px] flex text-White text-hs text-center justify-center items-center"
            >
              name
            </div>
          </div>
          <div
            class="bg-White rounded-r-[10px] text-hss w-[77px] h-[50px] shadow-sm flex gap-1 flex-col justify-center"
          >
            <label class="flex gap-1">
              <input type="radio" name="typeItem" value="itemTime" checked />
              <p>Item Time</p></label
            >
            <label class="flex gap-1">
              <input type="radio" name="typeItem" value="itemTurn" />
              <p>Item Turn</p></label
            >
          </div>
        </div>

        <div class="w-1/3 flex justify-end gap-2">
          <button
            class="btn btn-xs text-hss border-0 w-max text-Black h-[26px] rounded-full shadow-sm bg-White flex justify-center items-center"
            onclick="categoryItem.showModal()"
          >
            Category Custom Items
          </button>
          <button
            class="btn btn-xs text-hss border-0 w-[25px] text-Black h-[26px] rounded-full shadow-sm bg-White flex justify-center items-center"
            onclick="wiki.showModal()"
          >
            i
          </button>
          <dialog id="categoryItem" class="modal">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Hello!</h3>
              <p class="py-4">
                Press ESC key or click the button below to close
              </p>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <dialog id="wiki" class="modal">
            <div class="modal-box">
              <h3 class="font-bold text-lg">Hello!</h3>
              <p class="py-4">
                Press ESC key or click the button below to close
              </p>
              <div class="modal-action">
                <form method="dialog">
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div class="flex justify-center">
        <input
          type="text"
          placeholder="Name Item 1~4 Character"
          class="input input-sm input-bordered text-hss text-Black max-w-xs mt-3 w-[187px] bg-White"
        />
      </div>
      <div
        id="marge-items"
        class="w-auto flex flex-col items-center gap-3 h-auto"
      >
        <div id="select-Items-1">
          <p class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des">
            ITEMS 1
          </p>
          <div
            class="item-bar w-max flex p-1 gap-5 bg-White text-hss scr-l:text-hs-des text-White h-max scr-l:h-[71px] rounded-[20px]"
          >
            <Item :pollItem="initIStructureitem">
              <template
                #default="{ item: { name, picture, isPerTurn, isAttack } }"
              >
                <label
                  class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 scr-l:w-[50px] w-[50px] rounded-[20px] h-[50px] items-center p-[1px]"
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
            class="item-bar w-max flex p-1 gap-5 bg-White text-hss scr-l:text-hs-des text-White h-max scr-l:h-[71px] rounded-[20px]"
          >
            <Item :pollItem="initIStructureitem">
              <template
                #default="{ item: { name, picture, isPerTurn, isAttack } }"
              >
                <label
                  class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 scr-l:w-[50px] w-[50px] rounded-[20px] h-[50px] items-center p-[1px]"
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
      <div class="flex justify-center gap-5 mt-4">
        <ButtonSetting styleType="save" title="Save" />
        <ButtonSetting styleType="cancle" title="Cancle" />
      </div>
    </div>
  </div>
</template>
./initIStructureitem
