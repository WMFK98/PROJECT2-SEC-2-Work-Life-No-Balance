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
import { onMounted, ref } from "vue";
import { deleteItemById, editItem, getItems } from "./../utils/fetchUtils";
import TypeItemsCusMangement from "@/libs/TypeItemsCusMangement";

const selectPageItem = ref(1);
const customItems = ref(new TypeItemsCusMangement());
const selectedItem1 = ref("");
const selectedItem2 = ref("");
const itemsName = ref("");
const isItemTime = ref(true);
let isEditing = false;

onMounted(async () => {
  customItems.value.addTypeItems(await getItems(import.meta.env.VITE_BASE_URL));
});

const openEditItem = (editId) => {
  const itemSelected = customItems.value.findTypeItem(editId);
  itemsName.value = itemSelected.name;
  selectedItem1.value = itemSelected.ability[0];
  selectedItem2.value = itemSelected.ability[1];
  isItemTime.value = !itemSelected.isPerTurn;
  isEditing = true;
  createItem.showModal();
};

const resetForm = () => {
  itemsName.value = "";
  selectedItem1.value = "";
  selectedItem2.value = "";
  isItemTime.value = true;
  isEditing = false;
};

const removeItem = async (removeId) => {
  const statusCode = await deleteItemById(
    import.meta.env.VITE_BASE_URL,
    removeId
  );
  if (statusCode === 200) customItems.value.removePollItem(removeId);
};

const saveItems = async () => {
  const addedItem = await addItem(import.meta.env.VITE_BASE_URL, {
    name: itemsName.value,
    ability: [selectedItem1.value, selectedItem2.value],
    isTurn: isPerTime.value,
  });

  if (addedItem !== undefined) {
    customItems.value.addTypeItem({
      id: addedItem.id,
      name: addedItem.name,
      ability: addedItem.ability,
      isTurn: addedItem.isTurn,
    });
  }
  itemStorage.value = { id: undefined, name: "", ability: "", isTurn: "" };
};
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
            class="btn btn-xs bg-btn-save hover:bg-btn-save-hover hover:text-Black text-White text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-max h-[26px] rounded-full shadow-sm flex justify-center items-center"
            onclick="createItem.showModal()"
            @click="playSoundSFX(soundbtn)"
          >
            ✚ Create Item
          </button>
          <button
            class="btn btn-xs hover:bg-Yellow text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-[25px] scr-m:w-[50px] text-Black h-[26px] rounded-full shadow-sm bg-Yellow-light flex justify-center items-center"
            onclick="wiki.showModal()"
            @click="playSoundSFX(soundbtn)"
          >
            𝐢
          </button>

          <HowtoPlay id="createItem">
            <template #body>
              <div
                id="navbar"
                class="flex justify-between h-max w-full text-Black items-start"
              >
                <div
                  class="w-1/3 text-hs scr-m:text-hm-tal scr-l:text-hm-des font-bold flex"
                >
                  <p
                    class="bg-opacity-0 text-Black border-0 shadow-none flex items-center gap-2 w-max h-max"
                  >
                    {{ isEditing ? "Edit Item" : "Custom Item" }}
                  </p>
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
                        :class="isItemTime ? 'bg-item-time' : ' bg-item-turn'"
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
                          v-model="isItemTime"
                          :value="true"
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
                          v-model="isItemTime"
                          :value="false"
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
                  <div id="select-Items-1">
                    <p
                      class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des"
                    >
                      ITEMS 1
                    </p>
                    <div
                      class="item-bar w-max flex p-1 gap-1 bg-White text-hss scr-l:text-hs-des scr-l:gap-8 text-White h-max rounded-[20px]"
                    >
                      <Item :pollItem="initStructureItem">
                        <template
                          #default="{
                            item: { name, picture, isPerTurn, isAttack },
                          }"
                        >
                          <label
                            class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 w-[50px] scr-m:w-[70px] scr-m:h-[70px] rounded-[20px] h-[50px] items-center p-[1px]"
                            :class="
                              selectedItem1 === name
                                ? 'bg-Yellow-light'
                                : isPerTurn ||
                                  name === 'Dice+' ||
                                  name === 'Dice-'
                                ? 'bg-item-turn text-White'
                                : isAttack
                                ? 'bg-Main-pink-300 text-White'
                                : 'bg-item-time text-White'
                            "
                          >
                            <input
                              @click="
                                selectedItem1 === name
                                  ? (selectedItem1 = '')
                                  : (selectedItem1 = name)
                              "
                              type="checkbox"
                            />

                            <img class="swap-off" :src="picture" />
                            <img class="swap-on" :src="picture" />
                          </label>
                        </template>
                      </Item>
                    </div>
                  </div>
                  <div id="select-Items-2">
                    <p
                      class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des"
                    >
                      ITEMS 2
                    </p>
                    <div
                      class="item-bar w-max flex p-1 gap-1 bg-White text-hss scr-l:text-hs-des scr-l:gap-8 text-White h-max rounded-[20px]"
                    >
                      <Item :pollItem="initStructureItem">
                        <template
                          #default="{
                            item: { name, picture, isPerTurn, isAttack },
                          }"
                        >
                          <label
                            class="swap swap-rotate flex-1 scr-l:text-hs-des text-hs-tal item btn btn-sm border-0 w-[50px] scr-m:w-[70px] scr-m:h-[70px] rounded-[20px] h-[50px] items-center p-[1px]"
                            :class="
                              selectedItem2 === name
                                ? 'bg-Yellow-light'
                                : isPerTurn ||
                                  name === 'Dice+' ||
                                  name === 'Dice-'
                                ? 'bg-item-turn text-White'
                                : isAttack
                                ? 'bg-Main-pink-300 text-White'
                                : 'bg-item-time text-White'
                            "
                          >
                            <input
                              @click="
                                selectedItem2 === name
                                  ? (selectedItem2 = '')
                                  : (selectedItem2 = name)
                              "
                              type="checkbox"
                            />
                            <img class="swap-off" :src="picture" />
                            <img class="swap-on" :src="picture" />
                          </label>
                        </template>
                      </Item>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #btn>
              <div class="flex w-full gap-2 justify-between">
                <ButtonSetting
                  class="w-[49%] scr-l:w-[49%]"
                  styleType="save"
                  title="Save"
                  :action="saveItems"
                />
                <ButtonClosePopup
                  @click="resetForm"
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
        @deleteItem="removeItem"
        @editItem="openEditItem"
      />
    </div>
  </div>
</template>
