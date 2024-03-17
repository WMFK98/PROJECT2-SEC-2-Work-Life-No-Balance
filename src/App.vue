<script setup>
import { reactive, ref, watch } from "vue";
import TypeItem from "./TypeItem";
import { random } from "./tool";
import ItemManagement from "./ItemsManagement";

import Item from "./Item";
import addItem from "/music/addItem.mp3";
import backgroundMusic from "/music/backgroundMusic.mp3";
import soundHold from "/music/holdsound.mp3";
import soundWin from "/music/toothless.mp3";
import soundbtn from "/music/soundBtn.mp3";
import soundSwap from "/music/swapsound.mp3";

// Leng's Component
import DisplayDice from "./components/DisplayDice.vue";
import HowtoPlay from "./components/HowtoPlay.vue";
import Setting from "./components/Setting.vue";
import InputSetting from "./components/InputSetting.vue";
import ToggleSetting from "./components/ToggleSetting.vue";
import CheckboxsSetting from "./components/CheckboxsSetting.vue";
import ButtonSetting from "./components/ButtonSetting.vue";
import PopupLog from "./components/PopupLog.vue";
import ListItem from "./components/ListItem.vue";

import CurrentPoint from "./components/CurrentPoint.vue";
import ItemTutorials from "./components/ItemTutorials.vue";
//Pic Item
import Diceplus from "./assets/Icon_Dice_1/DicePlus.png";
import DelDice from "./assets/Icon_Dice_1/DelDice.png";
import DelTenSC from "./assets/Icon_Dice_1/DelTenSC.png";
import OddAndEven from "./assets/Icon_Dice_1/ODDEVENT.png";
import SixOneTime from "./assets/Icon_Dice_1/OneSixTM.png";
import PlusTwo from "./assets/Icon_Dice_1/PlusTwo.png";
import SqureTwo from "./assets/Icon_Dice_1/SqureTwo.png";
import SwitchSide from "./components/SwitchSide.vue";
import SwitchSideLower from "./components/SwitchSideLower.vue";

let voidScore = 1;
// const diceFace = [roll1, roll2, roll3, roll4, roll5, roll6]
const musicBG = new Audio(backgroundMusic);
const musicWin = new Audio(soundWin);
musicBG.loop = true;
musicWin.loop = true;
const currentMusicBG = ref(musicBG);
const theWinner = ref(null);
const pollSelectedItems = [];
const isPlaySoundSF = ref(true);
const isPlayMusic = ref(true);

let pollItem = [];
let checkSelectedItems = reactive([]);
let givePoint = 0;
let dices = reactive([1, 1]);
let phaseGame = 0;

let defaultSetting = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {
  settingPoint: 100,
  limitItem: 7,
  addItemNumSetting: 1,
  startingItem: 0,

};


const currentSetting = reactive({ ...defaultSetting });

const player1 = reactive({
  name: "p1",
  point: 0,
  curPoint: 0,
  items: new ItemManagement("p1", pollItem),
  buff: [],
});

const player2 = reactive({
  name: "p2",
  point: 0,
  curPoint: 0,
  items: new ItemManagement("p2", pollItem),
  buff: [],
});

const currentPlayer = reactive([player1]);
const enemyPlayer = reactive([player2]);

const rollDiceAbility = () => {
  dices = dices.map(() => random(1, 6));
  givePoint = dices.reduce((total, dice) => total + dice);
};

const resetMusic = () => {
  musicBG.currentTime = 0;
  musicWin.currentTime = 0;
  if (currentMusicBG.value !== musicWin) return;
  currentMusicBG.value.pause();
  currentMusicBG.value = musicBG;
};

const playSound = (song) => {
  if (!isPlaySoundSF.value) return;
  const soundSelect = new Audio(song);
  soundSelect.play();
};

const playMusicBg = () => {
  if (!isPlayMusic.value) return currentMusicBG.value.pause();
  if (theWinner.value) {
    currentMusicBG.value.pause();
    currentMusicBG.value = musicWin;
  }
  currentMusicBG.value.play();
};

const itemRollDice = new Item(
  new TypeItem("rollDice", rollDiceAbility, 2, "-", false)
);

const chooseItems = (index) => {
  checkSelectedItems[index] = !checkSelectedItems[index];
};

const reset = () => {
  resetDice();
  resetMusic();
  phaseGame = 0;
  dices = dices.map(() => 1);
  theWinner.value = null;
  currentPlayer[0] = player1;
  enemyPlayer[0] = player2;
  [player1, player2].forEach((player) => {
    player.point = 0;
    player.buff = [];
    player.curPoint = 0;
    player.items.clearAll();
    player.items.addRandomItem(defaultSetting.startingItem);
  });
};
const checkWin = () => {
  if (enemyPlayer[0].point >= defaultSetting.settingPoint) {
    theWinner.value = enemyPlayer[0];
    playMusicBg();
  }
};
const checkAddItem = () => {
  if (
    dices.length >= 2 &&
    dices[0] != 1 &&
    dices.every((dice) => dices[0] === dice) &&
    phaseGame !== 0
  ) {
    currentPlayer[0].items.addRandomItem(defaultSetting.addItemNumSetting);
    if (currentPlayer[0].items.getAllItem().length < defaultSetting.limitItem)
      playSound(addItem);
  }
};

const isVoidScore = () => dices.some((dice) => dice <= voidScore);

const activeItem = () => {
  const orderPriorityItem = [
    itemRollDice,
    ...currentPlayer[0].items.getAllItemUsed(),
    ...currentPlayer[0].buff,
  ];
  orderPriorityItem.sort((a, b) => a.itemInfo.priority - b.itemInfo.priority);
  orderPriorityItem.forEach((item) => {
    item.itemInfo.ability();
    if (item.itemInfo.isPerTurn && !item.isBuff)
      currentPlayer[0].buff.push({ isBuff: true, ...item });
  });
  currentPlayer[0].items.removeItembyUsedItem();
};

const switchPlayer = () => {
  voidScore = 1;
  phaseGame = 0;
  givePoint = 0;
  currentPlayer[0].buff = [];
  currentPlayer[0].curPoint = 0;
  currentPlayer[0].items.removeItembyUsedItem();
  currentPlayer[0] = currentPlayer[0] === player2 ? player1 : player2;
  enemyPlayer[0] = enemyPlayer[0] === player2 ? player1 : player2;
};

const resetDice = () => {
  if (dices.length < 2) dices.push(1);
  else dices = dices.slice(0, 2);
};

const roll = () => {
  if (phaseGame === 0) resetDice();
  phaseGame = 1;
  activeItem();
  if (!isVoidScore()) return (currentPlayer[0].curPoint += givePoint);
  switchPlayer();
  playSound(soundSwap);
};

const hold = () => {
  currentPlayer[0].items.UnusedAllItem();
  currentPlayer[0].point += currentPlayer[0].curPoint;
  currentPlayer[0].curPoint = 0;
  switchPlayer();
};
const closeSetting = () => {
  currentSetting.limitItem = defaultSetting.limitItem;
  currentSetting.addItemNumSetting = defaultSetting.addItemNumSetting;
  currentSetting.settingPoint = defaultSetting.settingPoint;
  currentSetting.startingItem = defaultSetting.startingItem;
  const arrNameItem = pollSelectedItems.map((item) => item.name);
  checkSelectedItems.forEach((isChecked, index) => {
    if (isChecked) {
      if (!arrNameItem.includes(pollItem[index].name)) {
        checkSelectedItems[index] = !checkSelectedItems[index];
      }
    } else {
      if (arrNameItem.includes(pollItem[index].name)) {
        checkSelectedItems[index] = !checkSelectedItems[index];
      }
    }
  });
};
const saveSetting = () => {
  const isInteger = (input, min, max) => {
    if (input === "") return false;
    const isValidInput = !isNaN(input) && Number.isInteger(Number(input));
    if (
      isValidInput &&
      typeof min !== "undefined" &&
      typeof max !== "undefined"
    ) {
      return input >= min && input <= max;
    }
    return isValidInput;
  };

  const addSelectedItem = function () {
    pollSelectedItems.splice(0, pollSelectedItems.length);
    checkSelectedItems.forEach((isChecked, index) => {
      if (isChecked) {
        pollSelectedItems.push(pollItem[index]);
      }
    });
    [player1, player2].forEach((el) => {
      el.items.changePollitem(pollSelectedItems);
    });
  };

  if (
    !isInteger(currentSetting.startingItem, 0, 7) ||
    !isInteger(currentSetting.settingPoint, 50, 500) ||
    !isInteger(currentSetting.limitItem, 0, 7) ||
    !isInteger(currentSetting.addItemNumSetting, 0, 7)
  ) {
    errorModal.showModal();
    closeSetting();
    return;
  }
  successModal.showModal();
  defaultSetting = { ...currentSetting };
  player1.items.setLimitItem(defaultSetting.limitItem);
  player2.items.setLimitItem(defaultSetting.limitItem);
  addSelectedItem();
  reset();
};

const initItem = () => {
  const N10Ability = function () {
    if (phaseGame === 0) return;
    enemyPlayer[0].point -= 10;
    enemyPlayer[0].point = enemyPlayer[0].point < 0 ? 0 : enemyPlayer[0].point;
  };

  const addDiceAbililty = function () {
    if (phaseGame === 0 || dices.length === 5) return;
    dices.push(1);
  };

  const X2P50Abililty = () => {
    if (phaseGame === 0) return;
    voidScore = 3;
    givePoint = givePoint * 2;
  };

  const Guarantee6Ability = () => {
    let isReplace = false;
    if (phaseGame === 0) return;
    dices = dices.map((value) => {
      if (isReplace || value === 6) return value;
      isReplace = true;
      return 6;
    });
    givePoint = dices.reduce((total, dice) => total + dice);
  };

  const OAEAbililty = () => {
    if (phaseGame === 0) return;
    if (isVoidScore()) switchPlayer();
    if (givePoint % 2 !== 0) {
      givePoint = Math.floor(givePoint / 2);
      enemyPlayer[0].point += givePoint;
    } else {
      enemyPlayer[0].point -= givePoint;
      enemyPlayer[0].point =
        enemyPlayer[0].point < 0 ? 0 : enemyPlayer[0].point;
    }
  };

  const popDiceAbililty = () => {
    if (phaseGame === 0 || dices.length < 2) return;
    dices.pop();
  };

  const plus2Abililty = () => {
    if (phaseGame === 0) return;
    givePoint = givePoint + 2;
  };

  const G6 = new TypeItem(
    "6",
    Guarantee6Ability,
    6,
    "การันตีว่าลูกเต๋า 1 ลูกจะทอยได้ 6",
    false,
    false,
    SixOneTime
  );
  const N10C = new TypeItem(
    "-10",
    N10Ability,
    0,
    "ลบ 10 “คะแนนของผู้เล่น” ฝ่ายตรงข้าม สามารถลดจนเหลือ 0",
    false,
    true,
    DelTenSC
  );
  const addDice = new TypeItem(
    "Dice+",
    addDiceAbililty,
    1,
    "เพิ่มลูกเต๋า 1 ลูกในทั้งตานั้น สามารถเพิ่มได้สูงสุด 5 ลูก",
    false,
    false,
    Diceplus
  );
  const X2P50 = new TypeItem(
    "X2>3",
    X2P50Abililty,
    8,
    "เเต้มที่ได้จากการทอยจะ คูณ2 เเต่ละหน้าของทุกลูกเต๋าต้องมากกว่า 3 ไม่งั้นจะสลับฝั่งผู้เล่นทันที",
    false,
    true,
    SqureTwo
  );
  const OAE = new TypeItem(
    "O&E",
    OAEAbililty,
    9,
    'เมื่อผู้เล่นทอยได้ผลรวมเป็น "คู่" จะขโมย “คะแนนของผู้เล่น” ของฝ่ายตรงข้ามเเต่ถ้าผลรวมเป็น "คี่" จะเเบ่งครึ่งนึงของที่ทอยได้ไปเพิ่ม “คะแนนของผู้เล่น” ให้ฝ่ายตรงข้าม',
    false,
    true,
    OddAndEven
  );
  const popDice = new TypeItem(
    "Dice-",
    popDiceAbililty,
    1,
    "ลดลูกเต๋า 1 ลูกในทั้งตานั้น สามารถลดได้จนเหลือ 1 ลูก",
    false,
    false,
    DelDice
  );
  const plus2Point = new TypeItem(
    "+2",
    plus2Abililty,
    7,
    "ทุกการทอยจะเพิ่ม “คะแนนในตานั้น” 2 เเต้ม",
    false,
    false,
    PlusTwo
  );
  player1.items.addItem(addDice);
  pollItem.push(X2P50, addDice, G6, N10C, OAE, popDice, plus2Point);
  checkSelectedItems = reactive(new Array(pollItem.length).fill(true));
  pollSelectedItems.push(X2P50, addDice, G6, N10C, OAE, popDice, plus2Point);
}

const init = () => {
  watch(() => [player1.point, player2.point], checkWin);
  watch(() => [player1.curPoint, player2.curPoint], checkAddItem);
  watch(() => isPlayMusic.value, playMusicBg);
  watch(currentSetting, (newVal) => {
    localStorage.setItem('settings', JSON.stringify(newVal));
  }, { deep: true }); 
  initItem();
  reset()

};

init();

console.log(defaultSetting);
</script>

<template>
  <!-- bug พิศวง -->
  <p class="hidden">{{ player1.curPoint }} {{ player2.curPoint }}</p>
  <div
    id="bg"
    class="bg-from-inherit w-screen h-screen flex justify-center items-center overflow-hidden"
    style="
      background: var(--bg, linear-gradient(297deg, #ff00d6 0%, #ff6b64 65.5%));
    "
  >
    <div
      id="board"
      class="w-[640px] shadow-lg h-[340px] bg-btn-none-active rounded-[20px] flex flex-col overflow-hidden scr-m:w-[961.15px] scr-m:h-[550px] scr-l:w-[1246px] scr-l:h-[713px]"
    >
      <div id="display" class="bg-White h-max flex justify-between">
        <SwitchSide
          :player="player1"
          :the-winner="theWinner"
          :current-player="currentPlayer"
        />

        <div
          id="display-dice"
          class="flex flex-col py-2 scr-l:pt-[19px] gap-2 scr-m:gap-[22px] items-center"
        >
          <div id="top-btn" class="flex gap-3 items-center">
            <HowtoPlay :playSound="playSound">
              <template #items-tutorial>
                <ItemTutorials :poll-item="pollItem" />
              </template>
            </HowtoPlay>

            <button
              @click="[reset(), playSound(soundbtn)]"
              class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
            >
              🆕 NEW GAME
            </button>
            <button
              class="bg-Yellow-light px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs border-0 scr-m:h-[39px] scr-m:w-max scr-m:px-[15px] scr-m:rounded-[30px] scr-l:h-[50px]"
              onclick="setting.showModal()"
              @click="playSound(soundbtn)"
            >
              ⚙️
            </button>
            <Setting>
              <template #inputSetting>
                <InputSetting
                  title="Amount of point to win (50-500)"
                  v-model="currentSetting.settingPoint"
                />
                <InputSetting
                  title="Maximum amount of item (0-7)"
                  v-model="currentSetting.limitItem"
                />
                <InputSetting
                  title="Amount of add item per time (0-7)"
                  v-model="currentSetting.addItemNumSetting"
                />
                <InputSetting
                  title="Amount of item at start (0-7)"
                  v-model="currentSetting.startingItem"
                />
              </template>
              <template #toggleSetting>
                <ToggleSetting
                  title="Sound music"
                  v-model="isPlayMusic"
                  show-on="🔊"
                  show-off="🔇"
                />
                <ToggleSetting
                  title="Sound SFX"
                  v-model="isPlaySoundSF"
                  show-on="🔊"
                  show-off="🔇"
                />
              </template>

              <template #checkboxSetting>
                <CheckboxsSetting
                  title="Item Random:"
                  :action="chooseItems"
                  :values="pollItem"
                  :checkboxs="checkSelectedItems"
                />
              </template>
              <template #submit>
                <ButtonSetting
                  title="Save"
                  :action="saveSetting"
                  style-type="save"
                  :play-sound="playSound"
                />
                <ButtonSetting
                  title="close"
                  :action="closeSetting"
                  style-type="close"
                  :play-sound="playSound"
                />
                <PopupLog log="❌Something went wrong❌" type="errorModal" />
                <PopupLog log="✅Success✅" type="successModal" />
              </template>
            </Setting>
          </div>

          <div
            id="dices "
            class="flex z-0 gap-3 justify-center w-max mx-3 h-max pb-[2px] scr-l:pb-[10px] scr-m:gap-[32px]"
          >
            <DisplayDice :dices="dices" />
          </div>
        </div>
        <SwitchSide
          :player="player2"
          :the-winner="theWinner"
          :current-player="currentPlayer"
        />
      </div>
      <div id="controller" class="flex flex-auto justify-center relative">
        <SwitchSideLower
          :player="player1"
          :the-winner="theWinner"
          :current-player="currentPlayer[0]"
          :isPlaySoundSF="isPlaySoundSF"
        >
          <template #currentPoint>
            <CurrentPoint
              :player="player1"
              :the-winner="theWinner"
              :is-left="true"
            />
          </template>
          <template #items-bar>
            <ListItem
              :player="player1"
              :current-player="currentPlayer[0]"
              :the-winner="theWinner"
              :is-play-sound-s-f="isPlaySoundSF"
            ></ListItem
          ></template>
        </SwitchSideLower>
        <SwitchSideLower
          :player="player2"
          :the-winner="theWinner"
          :current-player="currentPlayer[0]"
          :isPlaySoundSF="isPlaySoundSF"
        >
          <template #currentPoint>
            <CurrentPoint
              :player="player2"
              :the-winner="theWinner"
              :is-left="false"
            />
          </template>
          <template #items-bar>
            <ListItem
              :player="player2"
              :current-player="currentPlayer[0]"
              :the-winner="theWinner"
              :is-play-sound-s-f="isPlaySoundSF"
            ></ListItem></template
        ></SwitchSideLower>
        <div
          id="btns"
          class="absolute flex flex-col gap-[16px] mt-5 scr-m:mt-20 scr-l:mt-[125px] items-center"
        >
          <button
            :disabled="theWinner"
            @click="[roll(), playMusicBg(), playSound(soundbtn)]"
            id="btn-roll"
            class="btn w-[75px] scr-m:w-[166px] hover:bg-btn-hover bg-btn-active h-[60px] scr-m:h-max p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:flex-row items-center scr-m:rounded-[30px] scr-l:w-[200px]"
          >
            <p>🎲 ROLL</p>
            <p>DICE</p>
          </button>
          <button
            :disabled="theWinner"
            @click="[hold(), playSound(soundHold)]"
            id="btn-hold"
            class="btn w-[75px] scr-m:w-[113px] hover:bg-btn-hover scr-m:h-max bg-btn-active h-[60px] p-0 border-0 text-hss scr-m:text-hs-tal scr-l:text-hs-des text-Black flex flex-col scr-m:rounded-[30px] scr-l:w-[136px]"
          >
            <p>📥 Hold</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
