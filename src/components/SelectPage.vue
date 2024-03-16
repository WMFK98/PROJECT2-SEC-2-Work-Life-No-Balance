<script setup>
import { playSoundSFX } from "@/SoundControl";
import soundbtn from "/music/soundBtn.mp3";
defineProps({ modelValue: Number, namePages: Array });
</script>

<template>
  <div className="join">
    <input
      className="join-item btn btn-sm scr-l:rounded-[20px]   scr-l:btn-lg scr-l:text-hs-des  btn-square w-[100px] scr-l:w-[200px] bg-Main-pink-100  text-Black border-0 hover:bg-Main-pink-200"
      type="radio"
      name="options"
      :aria-label="namePages[0]"
      :value="1"
      @click="
        [
          $emit('update:modelValue', +$event.target.value),
          playSoundSFX(soundbtn),
        ]
      "
      :disabled="modelValue === 1"
    />
    <input
      className="join-item btn btn-sm scr-l:btn-lg scr-l:rounded-[20px]  hover:bg-Main-pink-200 scr-l:text-hs-des btn-square  border-0 scr-l:w-[200px] bg-Main-pink-100  text-Black  w-[100px]"
      type="radio"
      name="options"
      :aria-label="namePages[1]"
      :value="2"
      :disabled="modelValue === 2"
      @click="
        [
          $emit('update:modelValue', +$event.target.value),
          playSoundSFX(soundbtn),
        ]
      "
    />
  </div>
</template>
