<script setup>
const props = defineProps({
  title: String,
  checkboxs: Array,
  action: Function,
  values: [Array, Object],
});
defineEmits(["enableItem"]);
</script>

<template>
  <div class="flex flex-col gap-2 scr-l:gap-6">
    <h2>{{ title }}</h2>
    <div class="flex gap-3 flex-wrap text-Black scr-l:justify-between">
      <label
        v-for="(item, index) in values"
        :key="index"
        className="flex justify-between w-[50px] scr-m:w-[70px] gap-1  cursor-pointer checked:bg-btn-hover"
      >
        <input
          @click="$emit('enableItem', item)"
          type="checkbox"
          :checked="checkboxs.find(({ id }) => id === item.id)"
          className="checkbox border-2   checkbox-xs scr-m:checkbox-md scr-l:checkbox-lg"
        />
        <span>{{ item.name }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped></style>
