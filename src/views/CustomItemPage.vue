<script setup>
import initStructureItem from "./../initStructureItem";
import Item from "@/StateItem";
import ButtonSetting from "./../components/buttons/ButtonSetting.vue";
import BackIcon from "./../assets/Icon/BackIcon.vue";
import ItemsInfo from "./../components/items/ItemsInfo.vue";
import HowtoPlayPopup from "./../components/popups/HowtoPlayPopup.vue";
import SelectPage from "./../components/fieldinputs/SelectPage.vue";
import SelectItem from "@/components/fieldinputs/SelectItem.vue";
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../libs/SoundControl";
import { onMounted, ref, reactive } from "vue";
import { useCustom } from "@/stores/TypeItemsCusMangement";

import {
  addItem,
  deleteItemById,
  editItem,
  getItems,
} from "./../utils/fetchUtils";

import { useRouter } from "vue-router";

const route = useRouter();
const rollBack = () => {
  route.go(-1);
};
const customItems = useCustom();
const selectPageItem = ref(1);
const customItemForm = reactive({
  ability: [],
  name: "",
  isPerTurn: true,
});
const selectedItemId = ref(null);
let isEditing = false;
onMounted(async () => {
  customItems.addTypeItems(await getItems(import.meta.env.VITE_BASE_URL));
});

const setCustomItemFormById = (id) => {
  const itemSelected = customItems.findTypeItem(id);
  customItemForm.name = itemSelected.name;
  customItemForm.ability[0] = itemSelected.ability[0];
  customItemForm.ability[1] = itemSelected.ability[1];
  customItemForm.isPerTurn = itemSelected.isPerTurn;
};

const openEditItemPopup = (editId) => {
  selectedItemId.value = editId;
  setCustomItemFormById(editId);
  isEditing = true;
  createItem.showModal();
};

const resetForm = () => {
  customItemForm.name = "";
  customItemForm.ability[0] = "";
  customItemForm.ability[1] = "";
  customItemForm.isPerTurn = false;
  selectedItemId.value = null;
  isEditing = false;
};

const openRemoveItemPopup = (removeId) => {
  selectedItemId.value = removeId;
  setCustomItemFormById(removeId);
  removeItemPopup.showModal();
};

const removeItem = async () => {
  const statusCode = await deleteItemById(
    import.meta.env.VITE_BASE_URL,
    selectedItemId.value
  );
  if (statusCode === 200) customItems.removePollItem(selectedItemId.value);
  resetForm();
};

const saveItem = async () => {
  let updateItem;
  if (isEditing) {
    updateItem = await editItem(
      import.meta.env.VITE_BASE_URL,
      selectedItemId.value,
      {
        ...customItemForm,
      }
    );
    if (updateItem)
      customItems.updateTypeItem(selectedItemId.value, {
        ...updateItem,
      });
  } else {
    updateItem = await addItem(import.meta.env.VITE_BASE_URL, {
      ...customItemForm,
    });
    if (updateItem) customItems.addTypeItem({ ...updateItem });
    resetForm();
  }
};
</script>

<template>
  <div class="absolute"></div>

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
        class="flex justify-between h-max w-full text-Black items-center"
      >
        <div
          class="w-1/3 text-hs scr-m:text-hm-tal scr-l:text-hm-des font-bold flex items-center gap-3"
        >
          <button
            class="group bg-opacity-0 text-Black border-0 shadow-none flex items-center gap-2 w-max h-max"
          >
            <BackIcon
              @click="rollBack"
              class="h-[20px] w-[20px] scr-m:h-[30px] scr-m:w-[30px] scr-l:h-[50px] scr-l:w-[50px]"
            />
          </button>
          <SelectPage
            v-model="selectPageItem"
            :name-pages="['Custom Items', 'Base Items']"
          />
        </div>
        <div class="w-auto flex justify-end gap-2">
          <div
            v-show="selectPageItem === 2"
            class="flex gap-3 text-hss scr-l:text-hs-des"
          >
            <div class="flex gap-3 text-hss scr-l:text-hs-des">
              <div class="flex gap-2 src-l:gap-4">
                <div class="bg-item-time w-4 scr-l:w-8 rounded-[5px]"></div>
                <p>Item Time</p>
              </div>
              <div class="flex gap-2">
                <div class="bg-item-turn w-4 scr-l:w-8 rounded-[5px]"></div>
                <p>Item Turn</p>
              </div>
              <div class="flex gap-2">
                <div class="bg-Main-pink-300 w-4 scr-l:w-8 rounded-[5px]"></div>
                <p>Item Attack</p>
              </div>
            </div>
          </div>
          <button
            class="btn btn-xs bg-btn-save hover:bg-btn-save-hover hover:text-Black text-White text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-max h-[26px] rounded-full shadow-sm flex justify-center items-center"
            onclick="createItem.showModal()"
            @click="playSoundSFX(soundbtn)"
            v-show="selectPageItem === 1"
          >
            ✚ Create Item
          </button>
          <button
            class="btn btn-xs hover:bg-Yellow text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-[25px] scr-m:w-[50px] text-Black h-[26px] rounded-full shadow-sm bg-Yellow-light flex justify-center items-center"
            onclick="wiki.showModal()"
            @click="playSoundSFX(soundbtn)"
            v-show="selectPageItem === 1"
          >
            𝐢
          </button>
          <HowtoPlayPopup id="removeItemPopup">
            <template #body>
              <h1 class="text-hm-des">Are you sure to remove this item?</h1>
              <div
                class="flex bg-White w-full scr-l:rounded-[20px] rounded-[10px]"
              >
                <div
                  id="item-box"
                  class="box-item scr-l:w-[560px] scr-m:h-[80px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
                >
                  <div
                    class="w-[35px] rounded-[10px] scr-m:h-[50px] scr-m:w-[50px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
                    :class="
                      customItemForm.isPerTurn
                        ? 'bg-item-turn text-White'
                        : 'bg-item-time text-White'
                    "
                  >
                    <p>
                      {{ customItemForm.name }}
                    </p>
                  </div>
                  <p
                    class="text-hss text-Black scr-m:text-hs-tal scr-l:text-[18px] w-[75%] scr-l:w-[65%]"
                  >
                    <strong>{{ customItemForm.name }}</strong> :
                    {{ customItemForm.ability }}
                  </p>
                </div>
              </div>
            </template>
            <template #btn>
              <div class="flex gap-2">
                <form
                  method="dialog"
                  class="w-[49%] scr-l:w-[49%] flex justify-center"
                >
                  <ButtonSetting
                    class="w-full"
                    styleType="close"
                    title="Yes!"
                    :action="removeItem"
                  />
                </form>
                <form
                  method="dialog"
                  class="w-[49%] scr-l:w-[49%] flex justify-center"
                >
                  <ButtonSetting
                    class="w-full"
                    styleType="save"
                    title="No"
                    :action="resetForm"
                  />
                </form></div
            ></template>
          </HowtoPlayPopup>
          <HowtoPlayPopup id="createItem">
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
                    {{
                      isEditing
                        ? "Edit Item : " + selectedItemId
                        : "Custom Item"
                    }}
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
                        :class="
                          customItemForm.isPerTurn
                            ? ' bg-item-turn'
                            : 'bg-item-time'
                        "
                      >
                        <span v-if="!customItemForm.name">name</span>
                        <span v-else>{{ customItemForm.name }}</span>
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
                          v-model="customItemForm.isPerTurn"
                          :value="false"
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
                          v-model="customItemForm.isPerTurn"
                          :value="true"
                        />
                        <span>Item Turn</span>
                      </label>
                    </div>
                  </div>

                  <div class="flex justify-center">
                    <input
                      type="text"
                      v-model.trim="customItemForm.name"
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
                    :items="initStructureItem"
                    SItem="1"
                    v-model="customItemForm.ability[0]"
                  />
                  <SelectItem
                    :items="initStructureItem"
                    v-model="customItemForm.ability[1]"
                  />
                </div>
              </div>
            </template>
            <template #btn>
              <div class="flex w-full gap-2 justify-between">
                <form
                  method="dialog"
                  class="w-[49%] scr-l:w-[49%] flex justify-center"
                >
                  <ButtonSetting
                    :disabled="
                      !customItemForm.name ||
                      !customItemForm.ability[0] ||
                      !customItemForm.ability[1]
                    "
                    class="w-full"
                    styleType="save"
                    title="Save"
                    :action="saveItem"
                  />
                </form>
                <form
                  method="dialog"
                  class="w-[49%] scr-l:w-[49%] flex justify-center"
                >
                  <ButtonSetting
                    class="w-full"
                    styleType="close"
                    title="Cancel"
                    :action="resetForm"
                  />
                </form></div
            ></template>
          </HowtoPlayPopup>
          <HowtoPlayPopup id="wiki">
            <template #navbar>
              <p>manual 📒</p>
            </template>
            <template #page>เล้งมาใส่หน่อย</template>
          </HowtoPlayPopup>
        </div>
      </div>
      <ItemsInfo
        class="h-full scr-m:h-full scr-l:h-full"
        v-show="selectPageItem === 2"
        :poll-item="initStructureItem"
      />

      <ItemsInfo
        class="h-full overflow-y-scroll scr-m:h-full scr-l:h-full"
        v-show="selectPageItem === 1"
        :poll-item="customItems.getAllTypeItems()"
        :can-edit="true"
        @deleteItem="openRemoveItemPopup"
        @editItem="openEditItemPopup"
      />
      <div
        class="m-auto flex justify-center flex-col items-center gap-3"
        v-show="!customItems.getAllTypeItems().length && selectPageItem === 1"
      >
        <p class="text-hm-des text-Black">Click to custom your item!!</p>
        <button
          class="btn btn-xs bg-btn-save hover:bg-btn-save-hover hover:text-Black text-White text-hss scr-m:btn-md scr-m:text-hs-tal border-0 w-max h-[26px] rounded-full shadow-sm flex justify-center items-center"
          onclick="createItem.showModal()"
          @click="playSoundSFX(soundbtn)"
        >
          Create Item
        </button>
      </div>
    </div>
  </div>
</template>
@/stores/TypeItemsCusMangement
