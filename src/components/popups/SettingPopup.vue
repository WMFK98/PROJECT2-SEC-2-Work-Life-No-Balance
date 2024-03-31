<script setup></script>

<template>
  <div>
    <dialog id="setting" class="modal">
      <div
        class="bg-Yellow-light scr-m:min-h-max scr-m:max-h-[65%] scr-l:max-h-[93%] text-Black flex flex-col gap-2 px-10 text-hss w-[380px] h-[200px] scr-m:h-max overflow-y-scroll scr-m:w-[500px] scr-m:gap-[20px] scr-m:py-15 scr-m:text-hs-tal scr-l:w-[1200px] rounded-[20px] py-[20px] scr-l:text-hs-des scr-l:gap-[30px]"
      >
        <slot name="title">
          <h3 class="font-bold text-center text-m">SETTING MENU</h3>
        </slot>
        <slot name="inputSetting">
          <p>empty inputSetting</p>
        </slot>
        <div class="flex flex-col scr-m:flex-row gap-2 justify-between">
          <slot name="toggleSetting">
            <p>empty soundSetting</p>
          </slot>
        </div>

        <slot name="checkboxSetting">
          <p>empty checkboxSetting</p>
        </slot>
        <div class="flex justify-center gap-5">
          <form method="dialog" class="justify-between flex gap-3 w-full px-10">
            <slot name="submit">
              <p>empty submit</p>
            </slot>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
