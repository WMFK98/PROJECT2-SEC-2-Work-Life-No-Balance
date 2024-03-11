<script setup>
const props = defineProps({
  title: String,
  checkboxs: Array,
  action: Function,
  values: [Array, Object],
});
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
          @click="action(index)"
          :v-model="checkboxs[index]"
          type="checkbox"
          :checked="checkboxs[index]"
          className="checkbox border-2   checkbox-xs scr-m:checkbox-md scr-l:checkbox-lg"
        />
        <span>{{ item.name }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped></style>
