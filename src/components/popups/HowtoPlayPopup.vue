<script setup>
import { ref } from "vue";
import SelectPage from "./../fieldinputs/SelectPage.vue";
import ItemsInfo from "./../items/ItemsInfo.vue";
import initStructureItem from "@/initStructureItem";
import ButtonSetting from "./../buttons/ButtonSetting.vue";
import { useCustom } from "@/stores/TypeItemsCusMangement";

const selectTutorialPage = ref(1);
const customItem = useCustom();
defineProps({ id: String });
</script>

<template>
  <dialog :id="id" class="modal">
    <div
      class="rounded-[20px] scr-l:rounded-[40px] pb-2 pt-3 bg-Yellow-light text-Black gap-2 flex flex-col px-7 text-hss w-[600px] scr-m:w-[900px] scr-l:w-[1200px] scr-l:text-hs-des scr-l:gap-4 scr-l:py-5"
    >
      <slot name="body">
        <nav
          id="navbar-tutorial"
          class="flex pb-2 justify-between items-center"
        >
          <slot name="navbar">
            <SelectPage
              v-model="selectTutorialPage"
              :name-pages="['How to play', 'Base Items', 'Custom Items']"
            />
            <div
              v-show="selectTutorialPage === 1"
              class="flex gap-3 text-hss scr-l:text-hs-des scr-l:gap-6"
            >
              <div class="flex gap-2 scr-l:gap-4">
                <div class="w-4 scr-l:w-8 rounded-[5px]">🎲</div>
                <p>Roll Dice</p>
              </div>
              <div class="flex gap-2 scr-l:gap-4">
                <div class="w-4 scr-l:w-8 rounded-[5px]">📥</div>
                <p>Hold Point</p>
              </div>
              <div class="flex gap-2 scr-l:gap-4">
                <div
                  class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White flex justify-center"
                >
                  i
                </div>
                <p>Item</p>
              </div>
            </div>
            <div
              v-show="selectTutorialPage === 2 || selectTutorialPage === 3"
              class="flex gap-3 text-hss scr-l:text-hs-des"
            >
              <div class="flex gap-3 text-hss ml-2 scr-l:text-hs-des">
                <div class="flex gap-2 items-center src-l:gap-4">
                  <div
                    class="bg-item-time w-4 h-4 scr-l:w-8 scr-l:h-8 rounded-[5px]"
                  ></div>
                  <p>Item Time</p>
                </div>
                <div class="flex gap-2 items-center">
                  <div
                    class="bg-item-turn w-4 h-4 scr-l:w-8 scr-l:h-8 rounded-[5px]"
                  ></div>
                  <p>Item Turn</p>
                </div>
                <div class="flex gap-2 items-center">
                  <div
                    class="bg-Main-pink-300 w-4 h-4 scr-l:w-8 scr-l:h-8 rounded-[5px]"
                  ></div>
                  <p>Item Attack</p>
                </div>
              </div>
            </div>
          </slot>
        </nav>

        <ol
          class="h-[150px] scr-l:rounded-[20px] scr-l:h-[504px] scr-m:h-[300px] scr-m:text-hs-tal flex flex-col scr-l:gap-8 scr-l:p-[30px] gap-3 bg-White p-2 rounded-[10px] border overflow-y-scroll"
          v-show="selectTutorialPage === 1"
        >
          <slot name="page">
            <li><strong>กติกา:</strong></li>
            <li><strong>จำนวนผู้เล่น</strong>: 2 คน</li>
            <li><strong>รูปแบบ</strong>:ผลัดเทิร์น</li>
            <li>
              <strong>เงื่อนไขการชนะ</strong>: ผู้เล่นคนใดมี
              <strong>คะแนนสะสม</strong> ถึง 100 แต้มก่อนชนะ
            </li>

            <li>
              <strong>รอบเทิร์น</strong>: ผู้เล่นสี
              <span
                class="bg-Main-pink-100 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
              ></span>
              จะได้สิทธิ์ในการ
              <strong>Roll Dice 🎲</strong> , <strong>Hold 📥</strong> และ ใช้
              <strong>Item </strong
              ><span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >
            </li>
            <li>
              <strong>โมฆะ</strong>: เคลียร์คะแนนของผู้เล่นในเทิร์นยกเว้น
              <strong>คะแนนสะสม</strong> และสลับไปยังเทิร์นอีกฝ่ายทันที
            </li>
            <li><strong>การควบคุม:</strong></li>
            <li>
              Roll Dice 🎲 : ทอยเต๋าเพื่อรับคะแนนและคะแนนจะถูกเก็บใน
              <strong>คะแนนปัจจุบัน</strong>
            </li>
            <li>
              Hold 📥: บันทึก <strong>คะแนนปัจจุบัน</strong> ลง
              <strong>คะแนนสะสม</strong> และสลับไปเทิร์นอีกฝ่ายทันที
            </li>
            <li>
              <strong>แนะนำการเล่น:</strong>
            </li>
            <li>
              1. หาก
              <strong>Roll Dice 🎲</strong>
              ผู้เล่นมีโอกาสจะได้คะแนนเพิ่มมากขึ้นในแต่ละเทิร์น
              เว้นแต่หากลูกใดทอยได้หน้า 1 จะทำให้เป็น
              <strong>โมฆะ</strong> ทันที
            </li>
            <li>
              2. หาก
              <strong>Hold 📥</strong>
              ผู้เล่นจะไม่เสี่ยงต่อการสูญเสียคะแนนและจะทำให้เข้าใกล้
              <strong>เงื่อนไขการชนะ</strong> มากขึ้น
              แต่อีกฝ่ายก็ได้โอกาสเช่นกัน
            </li>
            <li>
              3. หากใช้ <strong>Item </strong
              ><span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >
              ผู้เล่นสามารถพลิกแพลงสถานการณ์หรือเพิ่มโอกาสในการชนะของตนเองมากขึ้น
              บางชิ้นมีพลังที่มหาศาลแต่แลกกับความเสี่ยง
              บางชิ้นอาจดูอ่อนแอแต่หากใช้ถูกเวลาก็ทรงพลังได้เช่นกัน
            </li>
            <li class="flex items-center">
              <strong>กฎ Item </strong
              ><span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >:
            </li>

            <li>
              <strong>การได้รับ</strong>:
              เมื่อผู้เล่นทอยเต๋าและออกหน้าที่เหมือนกันทั้งหมดจะได้รับไอเท็มแบบสุ่ม
              1 ชิ้น <strong>Item </strong
              ><span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >
            </li>
            <li>
              <strong>การใช้</strong>:
              ผู้เล่นจะต้องกดคลิกที่ช่องเก็บของตัวเองโดยจะขึ้นสี
              <span
                class="bg-Yellow-light w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-Black inline-flex justify-center"
                >i</span
              >
              บ่งบอกสถานะว่า
              <strong>กำลังจะใช้</strong> โดยมันจะทำงานหลังจากที่ผู้เล่น
              <strong>Roll Dice 🎲</strong>
              และจะหายไปทันทีหลังจากทำงานแล้ว
            </li>
            <li>
              <strong>การยกเลิก</strong>: การกดซ้ำอีกครั้งใน
              <strong>Item </strong>
              <span
                class="bg-Yellow-light w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-Black inline-flex justify-center"
                >i</span
              >
              จะเป็นการยกเลิก
            </li>
            <li>
              <strong>ความจุ</strong>: ผู้เล่นแต่ละคนมีกล่องเก็บที่สามารถเก็บ
              <strong>Item </strong
              ><span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >
              ได้สูงสุด 7 ชิ้น
            </li>
            <li>
              <strong>การซ้อนทับ</strong>:ผู้เล่นสามารถใช้ <strong>Item </strong
              ><span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >
              พร้อมกันได้ทุกชิ้นและสามารถใช้ซ้ำกันได้ในเทิร์นเดียว
            </li>

            <li>
              <strong>Type Item :</strong>
            </li>
            <li>
              <strong>Item Time </strong>
              <span
                class="bg-item-time w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >

              : เมื่อกดใช้จะมีผลเพียงครั้งเดียวเท่านั้น
            </li>
            <li>
              <strong>Item Turn </strong>
              <span
                class="bg-item-turn w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >

              : เมื่อกดใช้จะมีผลตลอดทั้งเทิร์น
            </li>
            <li>
              <strong>Item Attack </strong>
              <span
                class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                >i</span
              >

              : เมื่อกดใช้จะมีผลกับฝ่ายตรงข้ามทันที
            </li>
          </slot>
        </ol>
        <ItemsInfo
          v-show="selectTutorialPage === 2"
          :poll-item="initStructureItem"
          :size-small="true"
        />

        <ItemsInfo
          v-show="selectTutorialPage === 3"
          :poll-item="customItem.getAllTypeItems()"
          :size-small="true"
        />
      </slot>
      <slot name="btn">
        <form method="dialog" class="flex justify-center">
          <ButtonSetting class="w-full" styleType="close" title="close" />
        </form>
      </slot>
    </div>
  </dialog>
</template>
