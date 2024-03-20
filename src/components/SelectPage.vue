<script setup>
import { playSoundSFX } from "./../libs/SoundControl";
import soundbtn from "/music/soundBtn.mp3";
defineProps({ modelValue: Number, group: String, namePages: Array });
</script>

<template>
  <div className="join">
    <input
      v-for="(page, index) in namePages"
      className="join-item btn btn-sm scr-l:rounded-[20px]   scr-l:btn-lg scr-l:text-hs-des  btn-square w-[100px] scr-l:w-[200px] bg-Main-pink-100  text-Black border-0 hover:bg-Main-pink-200"
      type="radio"
      :name="group"
      :aria-label="page"
      :value="index + 1"
      @click="
        [
          $emit('update:modelValue', +$event.target.value),
          playSoundSFX(soundbtn),
        ]
      "
      :checked="modelValue === index + 1"
    />
  </div>
</template>
@/libs/SoundControl
