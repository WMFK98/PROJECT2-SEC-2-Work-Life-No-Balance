<script setup>
import BackIcon from "./../assets/icons/BackIcon.vue";
import initStructureItem from "./../initStructureItem";
import ButtonSetting from "./../components/buttons/ButtonSetting.vue";
import ItemsInfo from "./../components/items/ItemsInfo.vue";
import HowtoPlayPopup from "./../components/popups/HowtoPlayPopup.vue";
import SelectPage from "./../components/fieldinputs/SelectPage.vue";
import SelectItem from "@/components/fieldinputs/SelectItem.vue";
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../libs/SoundControl";
import { onMounted, ref, reactive } from "vue";
import { useCustom } from "@/stores/TypeItemsCusMangement";
import TypeItemInfo from "@/components/other/TypeItemInfo.vue";
import {
  addItem,
  deleteItemById,
  editItem,
  getItems,
} from "./../utils/fetchUtils";

import { useRouter } from "vue-router";
import ItemInfo from "@/components/items/ItemInfo.vue";

const route = useRouter();
const rollBack = () => {
  route.go(-1);
};
const customItems = useCustom();
const selectPageItem = ref(1);
const customItemForm = reactive({
  ability: [],
  name: "",
  isPerTurn: false,
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
  }
  resetForm();
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
          <TypeItemInfo v-show="selectPageItem === 2" />

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
                  <ItemInfo :item="customItemForm" />
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
                    SItem="2"
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
            <template #page
              ><li>
                <strong>⚙️How To Custom Item</strong>
              </li>
              <li>
                <strong>วิธีผสมไอเทม🪄:</strong>
              </li>
              <li>
                <strong>เลือกความสามารถของไอเทมในการผสมได้:</strong> 2 ไอเทม
              </li>
              <li>
                <strong>เลือกรูปแบบของไอเทม: </strong
                ><span
                  class="bg-item-turn w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                  >i</span
                >
                : เมื่อกดใช้จะมีผลตลอดทั้งเทิร์น :
                <span
                  class="bg-item-time w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                  >i</span
                >

                เมื่อกดใช้จะมีผลเพียงครั้งเดียวเท่านั้น
              </li>
              <li>
                <strong>กระบวนการคือ:</strong>
              </li>

              <li>
                จะมี <strong>item 2 ช่อง</strong> ให้ผู้เล่นเลือก
                <strong> item </strong>
                ช่องละ 1 ไอเทมเพื่อที่จะนำเอาความาสามารถของทั้ง 2
                อันมารวมกันและผู้เล่นต้องเลือกว่าจะให้
                <strong> item </strong>
                ที่สร้างมานั้นเป็นรูปแบบการใช้ประเภทอะไร
                <strong>(Item Time⏳, Item Turn)</strong>
                และผู้เล่นยังสามารถที่จะ
                <strong>custom name item</strong>✍️
                ของไอเทมที่พึ่งสร้างขึ้นมาได้เมื่อผู้เล่นพอใจกับ
                <strong>item</strong>ของตัวเองแล้วกด <strong>Save</strong>🟢
                เพื่อยืนยันการสร้างของตัวเอง หรือถ้าไม่อยากสร้างแล้วก็กด
                <strong>Cancle</strong>🔴 เพื่อยกเลิกและออกจากหน้า custom
              </li>

              <li>
                <strong class="text-Main-pink-300"
                  >* โดยเมื่อผู้เล่นสร้างแล้ว
                  เมื่อต้องการใช้งานจำเป็นต้องไปตั้งค่าในส่วน Setting ⚙️
                  หน้าเกมก่อนจึงจะมีโอกาสสุ่มเจอได้</strong
                >
              </li>

              <li>
                <strong>วิธีแก้ไขไอเทมที่สร้างขึ้นมา🪄:</strong>
              </li>
              <li>
                กดที่ปุ่ม
                <strong>Edit 🟢</strong
                >เพื่อทำการแก้ไขไอเทมที่ตัวเองได้สร้างขึ้นมาสามารถเปลี่ยนชื่อหรือความสามารถอื่นๆได้ตามต้องการ
              </li>

              <li>
                กดที่ปุ่ม
                <strong>Delete 🔴</strong>เพื่อทำการลบไอเทมที่สร้างขึ้นมาออกจาก
                pool item
              </li></template
            >
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
        @handleIteminfo="
          (id, status) => {
            status === 'delete'
              ? openRemoveItemPopup(id)
              : openEditItemPopup(id);
          }
        "
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
