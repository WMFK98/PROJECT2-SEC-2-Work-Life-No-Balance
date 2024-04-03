<script setup>
import { defineProps } from "vue";
import ItemInfo from "./ItemInfo.vue";
const props = defineProps({
  pollItem: [Array, Object],
  canEdit: { type: Boolean, default: false },
  sizeSmall: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["handleIteminfo"]);
const handleBtnIteminfo = (id, status) => {
  emits("handleIteminfo", id, status);
};
</script>
<template>
  <div
    class="flex gap-2 flex-col overflow-y-scroll scr-l:flex-row scr-l:flex-wrap justify-start rounded-md"
    :class="
      sizeSmall ? ' h-[149px] scr-m:h-[290px]' : 'h-max scr-m:h-max scr-l:h-max'
    "
  >
    <div
      id="item-box"
      class="box-item scr-l:w-[560px] scr-m:h-[80px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
      v-for="(item, index) in pollItem"
      :key="index"
    >
      <ItemInfo
        :item="item"
        :canEdit="canEdit"
        @deleteItemC="handleBtnIteminfo"
        @editItemC="handleBtnIteminfo"
      >
      </ItemInfo>
    </div>
  </div>
</template>
<!-- {
  id,
  name,
  picture,
  discription,
  isPerTurn,
  isAttack,
  ability,
} -->
