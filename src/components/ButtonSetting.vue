<script setup>
<<<<<<< Updated upstream
import soundbtn from "/music/soundBtn.mp3";
import { playSoundSFX } from "./../SoundControl";
=======
import soundbtn from "/music/soundBtn.mp3"
import { playSoundSFX } from "./../libs/SoundControl"
>>>>>>> Stashed changes
const props = defineProps({
	title: String,
	action: Function,
	styleType: {
		type: String,
		varlidatior(value) {
			return ["save", "close"].includes(value)
		},
	},
})
</script>

<template>
<<<<<<< Updated upstream
  <button
    class="btn-save btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m"
    :class="
      styleType === 'save'
        ? 'hover:bg-[#96ff66]  bg-[#3e8a1b] hover:text-Black'
        : 'bg-Main-pink-300  hover:bg-Main-pink-100 hover:text-Black'
    "
    id="saveButton"
    @click="[action(), playSoundSFX(soundbtn)]"
  >
    {{ title }}
  </button>
=======
	<button
		class="btn-save btn border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m"
		:class="
			styleType === 'save'
				? 'bg-[#76e343] hover:bg-[#3e8a1b] text-Black  hover:text-White'
				: 'bg-Main-pink-300 hover:bg-Main-pink-200 text-White hover:text-Black '
		"
		id="saveButton"
		@click=";[action(), playSoundSFX(soundbtn)]"
	>
		{{ title }}
	</button>
>>>>>>> Stashed changes
</template>

<style scoped></style>
