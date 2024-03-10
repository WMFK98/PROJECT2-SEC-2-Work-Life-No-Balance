<script setup>
const props = defineProps({
  title: String,
  setting: Object,
});
</script>

<template>
  <label class="flex gap-2 cursor-pointer">
    <p>Sound SFX :</p>
    <div class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des">
      <input
        type="checkbox"
        v-model="propObj.isPlaySoundSF"
        @change="$emit('soundChange', propObj.isPlaySoundSF)"
      />

      <div class="swap-on">🔊</div>
      {{ propObj.isPlaySoundSF }}
      <div class="swap-off">🔇</div>
    </div>
  </label>
</template>

<style scoped></style>
