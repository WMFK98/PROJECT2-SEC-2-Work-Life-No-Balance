<script setup>
const props = defineProps({
	playSound: Function,
	selectTutorial: Number,
	pollItem: Array,
})
</script>

<template>
	<nav id="navbar-tutorial" class="flex pb-2 justify-between items-center">
		<div>
			<div
				v-show="selectTutorial === 2"
				class="flex gap-3 text-hss scr-l:text-hs-des"
			>
				<div class="flex gap-2 src-l:gap-4">
					<div class="bg-[#FF9B82] w-4 scr-l:w-8 rounded-[5px]"></div>
					<p>Item Time</p>
				</div>
				<div class="flex gap-2">
					<div class="bg-[#FF3FA4] w-4 scr-l:w-8 rounded-[5px]"></div>
					<p>Item Turn</p>
				</div>
				<div class="flex gap-2">
					<div class="bg-Main-pink-300 w-4 scr-l:w-8 rounded-[5px]"></div>
					<p>Item Attack</p>
				</div>
			</div>
		</div>
	</nav>
	<div
		v-show="selectTutorial === 2"
		id="items-box"
		class="flex gap-2 flex-col scr-l:flex-row scr-l:flex-wrap justify-start scr-l:justify-evenly overflow-scroll scr-l:h-max scr-l:overflow-hidden rounded-md h-[150px]"
	>
		<div
			id="item-box"
			class="box-item scr-l:w-[560px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
			v-for="({ name, discription, isPerTurn, isAttack }, index) in pollItem"
			:key="index"
		>
			<div
				class="w-[35px] rounded-[10px] scr-l:h-[70px] scr-l:w-[70px] scr-l:rounded-[15px] h-[35px] flex justify-center items-center text-White text-[10px] scr-m:text-hs-tal scr-l:text-hs-des"
				:class="
					isPerTurn || name === 'Dice+' || name === 'Dice-'
						? 'bg-isTurn text-White'
						: isAttack
						? 'bg-Main-pink-300 text-White'
						: 'bg-isPerTurn text-White'
				"
			>
				{{ name }}
			</div>
			<p class="text-hss scr-l:text-hs-des w-[80%]">
				{{ discription }}
			</p>
		</div>
	</div>
</template>

<style scoped></style>
