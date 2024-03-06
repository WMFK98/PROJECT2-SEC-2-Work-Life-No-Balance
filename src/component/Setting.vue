<script setup>
import soundbtn from "/music/soundBtn.mp3"
const props = defineProps({
	propObj: Object,
})
const emit = defineEmits(["soundChange"])
</script>

<template>
	<div>
		<button
			class="bg-Yellow-light px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs border-0 scr-m:h-[39px] scr-m:w-max scr-m:px-[15px] scr-m:rounded-[30px] scr-l:h-[50px]"
			onclick="setting.showModal()"
			@click="propObj.playSound(soundbtn)"
		>
			⚙️
		</button>
		<dialog id="setting" class="modal">
			<div
				class="bg-Yellow-light text-Black flex flex-col gap-2 px-10 text-hss w-[380px] h-[200px] scr-m:h-max overflow-y-scroll scr-m:w-[500px] scr-m:gap-[20px] scr-m:py-15 scr-m:text-hs-tal scr-l:w-[1200px] rounded-[20px] py-[20px] scr-l:text-hs-des scr-l:gap-[30px]"
			>
				<h3 class="font-bold text-center text-m">SETTING MENU</h3>

				<p class="flex justify-between">
					Amount of point to win (50-500)
					<input
						class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
						type="text"
						:v-model="propObj.currentSetting.settingPoint"
					/>
				</p>
				<p class="flex justify-between">
					Maximum amount of item (0-7)
					<input
						class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg text-center"
						type="text"
						:v-model="propObj.currentSetting.limitItem"
					/>
				</p>
				<p class="flex justify-between">
					Amount of add item per time (0-7)
					<input
						class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
						type="text"
						:v-model="propObj.currentSetting.addItemNumSetting"
					/>
				</p>

				<p class="flex justify-between">
					Amount of item at start (0-7)
					<input
						class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
						type="text"
						:v-model="propObj.currentSetting.startingItem"
					/>
				</p>
				<label class="flex gap-2 cursor-pointer">
					<p>Sound SFX :</p>
					<div
						class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des"
					>
						<input
							type="checkbox"
							v-model="propObj.isPlaySoundSF"
							@change="$emit('soundChange', propObj.isPlaySoundSF)"
						/>

						<div class="swap-on">🔊</div>
						<div class="swap-off">🔇</div>
					</div>
				</label>
				<label class="flex gap-2 cursor-pointer">
					<p>Sound music :</p>
					<div
						class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des"
					>
						<input type="checkbox" v-model="propObj.isPlayMusic" />
						<div class="swap-on">🔊</div>
						<div class="swap-off">🔇</div>
					</div>
				</label>
				<div class="flex flex-col gap-2 scr-l:gap-6">
					<h2>Item Random:</h2>
					<div class="flex gap-3 flex-wrap text-Black scr-l:justify-between">
						<label
							v-for="(item, index) in propObj.pollItem"
							:key="index"
							className="flex justify-between w-[50px] scr-m:w-[70px] gap-1  cursor-pointer checked:bg-btn-hover"
						>
							<input
								@click="propObj.chooseItems(index)"
								:v-model="propObj.checkSelectedItems[index]"
								type="checkbox"
								checked="checked"
								className="checkbox border-2   checkbox-xs scr-m:checkbox-md scr-l:checkbox-lg"
							/>
							<span>{{ item.name }}</span>
						</label>
					</div>
				</div>
				<div class="flex justify-center gap-5">
					<form method="dialog" class="justify-between flex w-full px-10">
						<button
							class="btn-save btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] hover:bg-[#96ff66] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m bg-[#3e8a1b] hover:text-Black"
							id="saveButton"
							@click=";[propObj.btnSaveSetting(), propObj.playSound(soundbtn)]"
						>
							Save
						</button>
						<div>
							<dialog id="errorModal" class="modal">
								<div class="modal-box bg-[#FFE68E]">
									<h3 class="font-bold text-lg text-center">
										❌Something went wrong❌
									</h3>
									<p class="py-4 text-center font-bold">
										Invalid Value! Please try again.
									</p>
								</div>
								<form method="dialog" class="modal-backdrop">
									<button>close</button>
								</form>
							</dialog>
						</div>
						<div>
							<dialog id="successModal" class="modal">
								<div class="modal-box bg-[#a6ffa3]">
									<h3 class="font-bold text-lg text-center">✅Success✅</h3>
									<p class="py-4 text-center font-bold">Change Successful😊</p>
								</div>
								<form method="dialog" class="modal-backdrop">
									<button>close</button>
								</form>
							</dialog>
						</div>
						<button
							class="btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] scr-l scr-l:h-[50px] bg-Main-pink-300 rounded-[10px] w-[100px] h-[25px] btn-xs scr-m:btn-md scr-l:btn-m hover:bg-Main-pink-100 hover:text-Black"
							id="cancelButton"
							@click=";[propObj.playSound(soundbtn), propObj.btnCloseSetting()]"
						>
							Close
						</button>
					</form>
				</div>
			</div>
		</dialog>
	</div>
</template>

<style scoped></style>
