<script setup>
const props = defineProps({
  canEdit: Boolean,
  item : Object
});
defineEmits(["deleteItemC", "editItemC"]);
</script>
 
<template>

      <div
        class="w-[35px] rounded-[10px] scr-m:h-[50px] scr-m:w-[50px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
        :class="
          item.isPerTurn || item.name === 'Dice+' || item.name === 'Dice-'
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
        <strong>{{ item.name }}</strong> : {{ item.discription ? item.discription : item.ability }}
      </p>
      <div
        v-if="canEdit"
        class="flex ml-auto gap-1 scr-m:flex-col h-full justify-center items-center scr-m:items-stretch"
      >
        <button
          class="btn btn-xs bg-btn-edit hover:bg-btn-edit-hover text-White border-0 hover:text-Black"
          @click="$emit('editItemC', item.id)"
        >
          Edit
        </button>
        <button
          @click="$emit('deleteItemC', item.id)"
          class="btn btn-xs bg-Main-pink-300 hover:bg-Main-pink-200 text-White hover:text-Black border-0"
        >
          Delete
        </button>
      </div>
</template>
 
<style scoped>

</style>