<script setup>
const props = defineProps({
  title: String,
  playSound: Function,
  action: Function,
  styleType: {
    type: String,
    define(value) {
      return ["save", "close"].includes(value);
    },
  },
});
</script>

<template>
  <button
    class="btn-save btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m"
    :class="styleType === 'save' ? 'hover:bg-[#96ff66]  bg-[#3e8a1b] hover:text-Black' :  '''' "
    id="saveButton"
    @click="[action(), playSound]"
  >
    {{ title }}
  </button>
</template>

<style scoped></style>
