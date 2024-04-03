<script setup>
import initStructureItem from "@/initStructureItem";
const props = defineProps({
  canEdit: Boolean,
  item: Object,
});
defineEmits(["deleteItemC", "editItemC"]);

const matchImagebyName = (name) => {
  return Object.entries(initStructureItem).find(
    ([_, value]) => value.name === name
  )?.[1]?.picture;
};
</script>

<template>
  <div
    class="w-[35px] relative rounded-[10px] scr-m:h-[50px] scr-m:w-[50px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
    :class="
      item.isPerTurn
        ? 'bg-item-turn text-White'
        : item.isAttack
        ? 'bg-Main-pink-300 text-White'
        : 'bg-item-time text-White'
    "
  >
    <img v-if="item.picture" :src="item.picture" />
    <p v-show="!item.picture">{{ item.name }}</p>
  </div>
  <p
  class="text-hss text-Black scr-m:text-hs-tal scr-l:text-[18px] w-[75%] scr-l:w-[65%]"
  >

    <div class="flex "   v-show="item.discription" ><strong>{{ item.name }} </strong> :  <p> {{ item.discription}}</p> </div> 
 

    <div class="flex items-center" v-show="!item.discription">
      <strong>Ability : </strong>
      <img
      class="h-[30px] scr-m:h-[40px] scr-l:h-[50px]"
      :src="matchImagebyName(item?.ability?.[0])"

    />
    +
    <img
      class="h-[30px] scr-m:h-[40px] scr-l:h-[50px]"
      :src="matchImagebyName(item?.ability?.[1])"

    />
    </div>

      


   
  </p>
  <div
    v-if="canEdit"
    class="flex ml-auto gap-1 scr-m:flex-col h-full justify-center items-center scr-m:items-stretch"
  >
    <button
      class="btn btn-xs bg-btn-edit hover:bg-btn-edit-hover text-White border-0 hover:text-Black"
      @click="$emit('editItemC', item.id, 'edit')"
    >
      Edit
    </button>
    <button
      @click="$emit('deleteItemC', item.id, 'delete')"
      class="btn btn-xs bg-Main-pink-300 hover:bg-Main-pink-200 text-White hover:text-Black border-0"
    >
      Delete
    </button>
  </div>
</template>

<style scoped></style>
