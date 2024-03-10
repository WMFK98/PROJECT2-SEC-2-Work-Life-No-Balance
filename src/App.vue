<script setup>
import { reactive, ref, watch } from "vue";
import TypeItem from "./TypeItem";
import { random } from "./tool";
import ItemManagement from "./ItemsManagement";
// import roll1 from "/images/dice-1.png"
// import roll2 from "/images/dice-2.png"
// import roll3 from "/images/dice-3.png"
// import roll4 from "/images/dice-4.png"
// import roll5 from "/images/dice-5.png"
// import roll6 from "/images/dice-6.png"
import Item from "./Item";
import addItem from "/music/addItem.mp3";
import backgroundMusic from "/music/backgroundMusic.mp3";
import soundHold from "/music/holdsound.mp3";
import soundWin from "/music/toothless.mp3";
import soundbtn from "/music/soundBtn.mp3";
import soundSwap from "/music/swapsound.mp3";

// Leng's Component
import DisplayDice from "./component/DisplayDice.vue";
import HowtoPlay from "./component/HowtoPlay.vue";
import Setting from "./component/Setting.vue";
import InputSetting from "./component/InputSetting.vue";
//Pic Item
import Diceplus from "./assets/Icon_Dice_1/DicePlus.png";
import DelDice from "./assets/Icon_Dice_1/DelDice.png";
import DelTenSC from "./assets/Icon_Dice_1/DelTenSC.png";
import OddAndEven from "./assets/Icon_Dice_1/ODDEVENT.png";
import SixOneTime from "./assets/Icon_Dice_1/OneSixTM.png";
import PlusTwo from "./assets/Icon_Dice_1/PlusTwo.png";
import SqureTwo from "./assets/Icon_Dice_1/SqureTwo.png";

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
let checkSelectedItems = [];
let givePoint = 0;
let dices = reactive([1, 1]);

let phaseGame = 0;

let defaultSetting = {
  settingPoint: 100,
  limitItem: 7,
  addItemNumSetting: 1,
  startingItem: 0,
};

const currentSetting = reactive({ ...defaultSetting });

const player1 = reactive({
  point: 0,
  curPoint: 0,
  items: new ItemManagement("p1", pollItem),
  buff: [],
});

const player2 = reactive({
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
  if (isPlaySoundSF.value === false) return;
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
const btnCloseSetting = () => {
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
const btnSaveSetting = () => {
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
  } else {
    successModal.showModal();
    defaultSetting = { ...currentSetting };
    player1.items.setLimitItem(defaultSetting.limitItem);
    player2.items.setLimitItem(defaultSetting.limitItem);
    addSelectedItem();
  }
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
};

const init = () => {
  watch(() => [player1.point, player2.point], checkWin);
  watch(() => [player1.curPoint, player2.curPoint], checkAddItem);
  watch(() => isPlayMusic.value, playMusicBg);
  initItem();
};

init();
</script>

<template>
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
        <div
          id="display-p1"
          class="w-[204.944px] scr-m:w-[307.78px] scr-l:w-[400px] shadow-xl rounded-tr-[20px] flex flex-col justify-center items-center pt-[15px]"
          :class="
            theWinner === player1
              ? 'bg-Black'
              : currentPlayer[0] === player1
              ? 'bg-Main-pink-100'
              : 'bg-Main-pink-200'
          "
        >
          <h2
            class="text-hm scr-m:text-hm-tal scr-l:text-hm-des"
            :class="theWinner === player1 ? 'text-Yellow' : 'text-Black'"
          >
            PLAYER 1
          </h2>
          <h1
            class="text-hl scr-m:text-hl-tal scr-l:text-hl-des"
            :class="
              theWinner === player1 ? 'text-Yellow' : 'text-Main-pink-300'
            "
          >
            {{ player1.point }}
          </h1>
        </div>
        <div
          id="display-dice"
          class="flex flex-col py-2 scr-l:pt-[19px] gap-2 scr-m:gap-[22px] items-center"
        >
          <div id="top-btn" class="flex gap-3 items-center">
            <HowtoPlay :playSound="playSound" :pollItem="pollItem" />
            <!-- </div> -->
            <button
              @click="[reset(), playSound(soundbtn)]"
              class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
            >
              🆕 NEW GAME
            </button>
            <Setting
              @soundChange="playSound()"
              @click="console.log(isPlaySoundSF)"
              :propObj="{
                playSound: playSound,
                btnCloseSetting: btnCloseSetting,
                btnSaveSetting: btnSaveSetting,
                isPlayMusic: isPlayMusic,
                pollItem: pollItem,
                chooseItems: chooseItems,
                checkSelectedItems: checkSelectedItems,
                isPlaySoundSF: isPlaySoundSF,
              }"
            >
              <template #inputSetting>
                <InputSetting
                  title="Amount of point to win (50-500)"
                  :setting="currentSetting.settingPoint"
                />
                <InputSetting
                  title="Maximum amount of item (0-7)"
                  :setting="currentSetting.limitItem"
                />
                <InputSetting
                  title="Amount of add item per time (0-7)"
                  :setting="currentSetting.addItemNumSetting"
                />
                <InputSetting
                  title="Amount of item at start (0-7)"
                  :setting="currentSetting.startingItem"
                />
              </template>
              <template #soundSetting>j</template>
            </Setting>
          </div>

          <div
            id="dices "
            class="flex z-0 gap-3 justify-center w-max mx-3 h-max pb-[2px] scr-l:pb-[10px] scr-m:gap-[32px]"
          >
            <!-- <img
              v-for="(dice, index) in dices"
              :key="index"
              class="max-h-[54px] scr-m:max-h-[81px] scr-l:max-h-[105px] min-h-0 scr-l:rounded-[30px] rounded-[20px] scr-m:rounded-[30px] shadow-lg"
              :src="diceFace[dice - 1]"
              :alt="'dice' + dice"
            /> -->
            <DisplayDice :dices="dices" />
          </div>
        </div>
        <div
          id="display-p2"
          class="w-[204.944px] scr-m:w-[307.78px] scr-l:w-[400px] shadow-xl rounded-tr-[20px] flex flex-col justify-center items-center pt-[15px]"
          :class="
            theWinner === player2
              ? 'bg-Black'
              : currentPlayer[0] === player2
              ? 'bg-Main-pink-100'
              : 'bg-Main-pink-200'
          "
        >
          <h2
            class="text-hm scr-m:text-hm-tal scr-l:text-hm-des"
            :class="theWinner === player2 ? 'text-Yellow' : 'text-Black'"
          >
            PLAYER 2
          </h2>
          <h1
            class="text-hl scr-m:text-hl-tal scr-l:text-hl-des"
            :class="
              theWinner === player2 ? 'text-Yellow' : 'text-Main-pink-300'
            "
          >
            {{ player2.point }}
          </h1>
        </div>
      </div>
      <div id="controller" class="flex flex-auto justify-center relative">
        <div
          id="controller-p1"
          class="w-1/2 flex flex-col px-3 py-5 scr-l:pb-[64px] scr-l:pr-[29px] scr-l:pl-[93px] gap-[35px] scr-m:gap-[70px] justify-end"
          :class="
            theWinner === player1
              ? 'bg-Black'
              : currentPlayer[0] === player1
              ? 'bg-Main-pink-100'
              : 'bg-Main-pink-200'
          "
        >
          <div
            id="cp-p1"
            class="ml-[47px] scr-l:ml-0 mr-auto w-[108px] h-[69px] rounded-[20px] flex flex-col justify-center items-center scr-m:h-[101.823px] scr-m:w-[162.763px] scr-l:w-[211px] scr-l:h-[132px]"
            :class="
              theWinner === player1
                ? ' bg-Yellow text-Black'
                : 'bg-Main-pink-300 text-White'
            "
          >
            <p class="text-hss scr-m:text-hs-tal scr-l:text-hs-des">CURRENT</p>
            <p class="text-hs scr-l:text-hm-des scr-m:text-hm-tal">
              {{ player1.curPoint }}
            </p>
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-Black px-1 scr-m:text-hs-tal scr-l:text-hs-des">
              ITEMS
            </p>
            <div
              id="items-p1 p-[2px]"
              class="max-w-auto h-[45px] rounded-[10px] flex p-1 gap-1 bg-White text-hss scr-m:text-hs-tal scr-l:text-hs-des text-White scr-m:h-[63.49px] scr-l:h-[71px] scr-m:rounded-[20px]"
            >
              <label
                v-for="{
                  id,
                  isUsed,
                  itemInfo: { name, isPerTurn, isAttack, picture },
                } in player1.items.getAllItem()"
                :key="id"
                class="swap swap-rotate item btn text-hss scr-l:text-hs-des scr-m:text-hs-tal btn-sm border-0 rounded-[10px] w-[38px] scr-l:w-[64px] scr-m:w-[57.49px] scr-m:rounded-[20px] h-auto items-center p-[1px]"
                :class="
                  !(currentPlayer[0] === player1) || theWinner
                    ? 'bg-btn-hover  text-White'
                    : isUsed
                    ? 'bg-Yellow-light  text-Black'
                    : isPerTurn || name === 'Dice+' || name === 'Dice-'
                    ? 'bg-isTurn text-White'
                    : isAttack
                    ? 'bg-Main-pink-300 text-White'
                    : 'bg-isPerTurn text-White'
                "
              >
                <input
                  @click="player1.items.toggleUsedItem(id, isPlaySoundSF)"
                  type="checkbox"
                  :disabled="!(currentPlayer[0] === player1) || theWinner"
                />
                <img class="swap-off" :src="picture" />
                <img class="swap-on" :src="picture" />
              </label>
            </div>
          </div>
        </div>
        <div
          id="controller-p2"
          class="w-1/2 flex flex-col px-3 py-5 scr-l:pb-[64px] scr-l:pr-[93px] scr-l:pl-[29px] gap-[35px] scr-m:gap-[70px] justify-end"
          :class="
            theWinner === player2
              ? 'bg-Black'
              : currentPlayer[0] === player2
              ? 'bg-Main-pink-100'
              : 'bg-Main-pink-200'
          "
        >
          <div
            id="cp-p2"
            class="ml-auto mr-[47px] scr-l:mr-0 w-[108px] h-[69px] rounded-[20px] flex flex-col justify-center items-center scr-m:h-[101.823px] scr-m:w-[162.763px] scr-l:w-[211px] scr-l:h-[132px]"
            :class="
              theWinner === player2
                ? ' bg-Yellow text-Black'
                : 'bg-Main-pink-300 text-White'
            "
          >
            <p class="text-hss scr-m:text-hs-tal scr-l:text-hs-des">CURRENT</p>
            <p class="text-hs scr-m:text-hm-tal scr-l:text-hm-des">
              {{ player2.curPoint }}
            </p>
          </div>

          <div class="flex flex-col gap-1">
            <p
              class="text-Black text-end px-1 scr-m:text-hs-tal scr-l:text-hs-des"
            >
              ITEMS
            </p>
            <div
              id="items-p2 p-[2px]"
              class="max-w-auto h-[45px] ; rounded-[10px] flex p-1 gap-1 flex-row-reverse bg-White text-hss scr-m:text-hs-tal scr-l:text-hs-des text-White scr-m:h-[63.49px] scr-l:h-[71px] scr-m:rounded-[20px]"
            >
              <label
                v-for="{
                  id,
                  isUsed,
                  itemInfo: { name, isPerTurn, isAttack, picture },
                } in player2.items.getAllItem()"
                :key="id"
                class="swap swap-rotate text-hss scr-l:text-hs-des scr-m:text-hs-tal item btn btn-sm border-0 rounded-[10px] w-[38px] scr-l:w-[64px] scr-m:w-[57.49px] scr-m:rounded-[20px] h-auto items-center p-[1px]"
                :class="
                  !(currentPlayer[0] === player2) || theWinner
                    ? 'bg-btn-hover  text-White'
                    : isUsed
                    ? 'bg-Yellow-light  text-Black'
                    : isPerTurn || name === 'Dice+' || name === 'Dice-'
                    ? 'bg-isTurn text-White'
                    : isAttack
                    ? 'bg-Main-pink-300 text-White'
                    : 'bg-isPerTurn text-White'
                "
              >
                <input
                  @click="player2.items.toggleUsedItem(id, isPlaySoundSF)"
                  type="checkbox"
                  :disabled="!(currentPlayer[0] === player2) || theWinner"
                />
                <img class="swap-off" :src="picture" />
                <img class="swap-on" :src="picture" />
              </label>
            </div>
          </div>
        </div>
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
