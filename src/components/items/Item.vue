<script setup>
const props = defineProps({ pollItem:  [Array,Object] });
</script>

<template>
  <slot
    id="item-box"
    v-for="(item, index) in pollItem"
    :key="index"
    :item = item
  >
  </slot>
</template>

<style scoped></style>
