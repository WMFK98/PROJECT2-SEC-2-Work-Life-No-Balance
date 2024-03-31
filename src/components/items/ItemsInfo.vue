<script setup>
import { defineProps } from "vue";
const props = defineProps({
  pollItem: [Array, Object],
  canEdit: { type: Boolean, default: false },
});
defineEmits(["deleteItem", "editItem"]);
</script>
<template>
  <div
    class="flex gap-2 flex-col overflow-y-scroll scr-l:flex-row scr-l:flex-wrap justify-start rounded-md h-max scr-m:h-max scr-l:h-max"
  >
    <div
      id="item-box"
      class="box-item scr-l:w-[560px] scr-m:h-[80px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
      v-for="{
        id,
        name,
        picture,
        discription,
        isPerTurn,
        isAttack,
        ability,
      } in pollItem"
      :key="id"
    >
      <div
        class="w-[35px] rounded-[10px] scr-m:h-[50px] scr-m:w-[50px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
        :class="
          isPerTurn || name === 'Dice+' || name === 'Dice-'
            ? 'bg-item-turn text-White'
            : isAttack
            ? 'bg-Main-pink-300 text-White'
            : 'bg-item-time text-White'
        "
      >
        <img v-if="picture" :src="picture" />
        <p v-show="!picture">{{ name }}</p>
      </div>
      <p
        class="text-hss text-Black scr-m:text-hs-tal scr-l:text-[18px] w-[75%] scr-l:w-[65%]"
      >
        <strong>{{ name }}</strong> : {{ discription ? discription : ability }}
      </p>
      <div
        v-if="canEdit"
        class="flex ml-auto gap-1 scr-m:flex-col h-full justify-center items-center scr-m:items-stretch"
      >
        <button
          class="btn btn-xs bg-btn-edit hover:bg-btn-edit-hover text-White border-0 hover:text-Black"
          @click="$emit('editItem', id)"
        >
          Edit
        </button>
        <button
          @click="$emit('deleteItem', id)"
          class="btn btn-xs bg-Main-pink-300 hover:bg-Main-pink-200 text-White hover:text-Black border-0"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
