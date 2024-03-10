<script setup>
const props = defineProps({
  propObj: Object,
});
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
        <slot name="inputSetting">
          <p>empty inputSetting</p>
        </slot>
        <slot name="toggleSetting">
          <p>empty soundSetting</p>
        </slot>

        <slot name="checkboxSetting">
          <p>empty checkboxSetting</p>
        </slot>
        <div class="flex justify-center gap-5">
          <form method="dialog" class="justify-between flex w-full px-10">
            <slot name="submit">
              <button
                class="btn-save btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m hover:bg-[#96ff66] bg-[#3e8a1b] hover:text-Black"
                id="saveButton"
                @click="[propObj.btnSaveSetting(), propObj.playSound(soundbtn)]"
              >
                Save
              </button>
              <div></div>
              <button
                class="btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] scr-l scr-l:h-[50px] bg-Main-pink-300 rounded-[10px] w-[100px] h-[25px] btn-xs scr-m:btn-md scr-l:btn-m hover:bg-Main-pink-100 hover:text-Black"
                id="cancelButton"
                @click="
                  [propObj.playSound(soundbtn), propObj.btnCloseSetting()]
                "
              >
                Close
              </button>
            </slot>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
