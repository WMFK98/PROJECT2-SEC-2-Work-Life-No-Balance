<script setup>
import { reactive, ref, watch } from 'vue';
import TypeItem from './TypeItem';
import { random } from './tool';
import ItemManagement from './ItemsManagement';
import roll1 from '/images/dice-1.png';
import roll2 from '/images/dice-2.png';
import roll3 from '/images/dice-3.png';
import roll4 from '/images/dice-4.png';
import roll5 from '/images/dice-5.png';
import roll6 from '/images/dice-6.png';
import Item from './Item';
import addItem from '/music/addItem.mp3';
import backgroundMusic from '/music/backgroundMusic.mp3';
import soundHold from '/music/holdsound.mp3';
import soundWin from '/music/toothless.mp3';
import soundbtn from '/music/soundBtn.mp3';
import soundSwap from '/music/swapsound.mp3';

let voidScore = 1;
const diceFace = [roll1, roll2, roll3, roll4, roll5, roll6];
const musicBG = new Audio(backgroundMusic);
const musicWin = new Audio(soundWin);
musicBG.loop = true;
musicWin.loop = true;
const currentMusicBG = ref(musicBG);
const theWinner = ref(null);
const pollSelectedItems = [];
const isPlaySoundSF = ref(true);
const isPlayMusic = ref(true);
const selectTutorial = ref(1);
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
  items: new ItemManagement('p1', pollItem),
  buff: [],
});

const player2 = reactive({
  point: 0,
  curPoint: 0,
  items: new ItemManagement('p2', pollItem),
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
  new TypeItem('rollDice', rollDiceAbility, 2, '-', false)
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
  const arrNameItem = pollSelectedItems.map(item => item.name);
  checkSelectedItems.forEach((isChecked, index) => {
      if (isChecked) {
        if(!arrNameItem.includes(pollItem[index].name)){
          checkSelectedItems[index] = !checkSelectedItems[index]
        }
      }else{
        if(arrNameItem.includes(pollItem[index].name)){
          checkSelectedItems[index] = !checkSelectedItems[index]
        }
      }
    });
}
const btnSaveSetting = () => {
  
  const isInteger = (input, min, max) => {
    if(input === "") return false;
    const isValidInput = !isNaN(input) && Number.isInteger(Number(input)) 
    if (
      isValidInput &&
      typeof min !== 'undefined' &&
      typeof max !== 'undefined'
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
    '6',
    Guarantee6Ability,
    6,
    'การันตีว่าลูกเต๋า 1 ลูกจะทอยได้ 6',
    false
  );
  const N10C = new TypeItem(
    '-10',
    N10Ability,
    0,
    'ลบ 10 “คะแนนของผู้เล่น” ฝ่ายตรงข้าม สามารถลดจนเหลือ 0',
    false,
    true
  );
  const addDice = new TypeItem(
    'Dice+',
    addDiceAbililty,
    1,
    'เพิ่มลูกเต๋า 1 ลูกในทั้งตานั้น สามารถเพิ่มได้สูงสุด 5 ลูก',
    false
  );
  const X2P50 = new TypeItem(
    'X2>3',
    X2P50Abililty,
    8,
    'เเต้มที่ได้จากการทอยจะ คูณ2 เเต่ละหน้าของทุกลูกเต๋าต้องมากกว่า 3 ไม่งั้นจะสลับฝั่งผู้เล่นทันที'
  );
  const OAE = new TypeItem(
    'O&E',
    OAEAbililty,
    9,
    'เมื่อผู้เล่นทอยได้ผลรวมเป็น "คู่" จะขโมย “คะแนนของผู้เล่น” ของฝ่ายตรงข้ามเเต่ถ้าผลรวมเป็น "คี่" จะเเบ่งครึ่งนึงของที่ทอยได้ไปเพิ่ม “คะแนนของผู้เล่น” ให้ฝ่ายตรงข้าม',
    false,
    true
  );
  const popDice = new TypeItem(
    'Dice-',
    popDiceAbililty,
    1,
    'ลดลูกเต๋า 1 ลูกในทั้งตานั้น สามารถลดได้จนเหลือ 1 ลูก',
    false
  );
  const plus2Point = new TypeItem(
    '+2',
    plus2Abililty,
    7,
    'ทุกการทอยจะเพิ่ม “คะแนนในตานั้น” 2 เเต้ม'
  );
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
            <div>
              <button
                id="btn-tutorial"
                class="bg-Yellow-light px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs border-0 scr-m:h-[39px] scr-m:w-max scr-m:px-[15px] scr-m:rounded-[30px] scr-l:h-[50px]"
                onclick="tutorial.showModal()"
                @click="playSound(soundbtn)"
              >
                📖
              </button>
              <dialog id="tutorial" class="modal">
                <div
                  class="rounded-[20px] scr-l:rounded-[40px] pb-2 pt-3 bg-Yellow-light text-Black gap-2 flex flex-col px-7 text-hss w-[600px] scr-l:w-[1200px] scr-l:text-hs-des scr-l:gap-4 scr-l:py-5"
                >
                  <nav
                    id="navbar-tutorial"
                    class="flex pb-2 justify-between items-center"
                  >
                    <div className="join">
                      <input
                        className="join-item btn btn-sm scr-l:rounded-[20px]   scr-l:btn-lg scr-l:text-hs-des  btn-square w-[100px] scr-l:w-[200px] bg-Main-pink-100  text-Black border-0 hover:bg-Main-pink-200"
                        type="radio"
                        name="options"
                        aria-label="How to play"
                        :value="1"
                        v-model="selectTutorial"
                        :disabled="selectTutorial === 1"
                      />
                      <input
                        className="join-item btn btn-sm scr-l:btn-lg scr-l:rounded-[20px]  hover:bg-Main-pink-200 scr-l:text-hs-des btn-square  border-0 scr-l:w-[200px] bg-Main-pink-100  text-Black  w-[100px]"
                        type="radio"
                        name="options"
                        aria-label="Item info"
                        :value="2"
                        v-model="selectTutorial"
                        :disabled="selectTutorial === 2"
                      />
                    </div>
                    <div
                      v-show="selectTutorial === 2"
                      class="flex gap-3 text-hss scr-l:text-hs-des"
                    >
                      <div class="flex gap-2 src-l:gap-4">
                        <div
                          class="bg-[#FF9B82] w-4 scr-l:w-8 rounded-[5px]"
                        ></div>
                        <p>Item Time</p>
                      </div>
                      <div class="flex gap-2">
                        <div
                          class="bg-[#FF3FA4] w-4 scr-l:w-8 rounded-[5px]"
                        ></div>
                        <p>Item Turn</p>
                      </div>
                      <div class="flex gap-2">
                        <div
                          class="bg-Main-pink-300 w-4 scr-l:w-8 rounded-[5px]"
                        ></div>
                        <p>Item Attack</p>
                      </div>
                    </div>
                    <div
                      v-show="selectTutorial === 1"
                      class="flex gap-3 text-hss scr-l:text-hs-des scr-l:gap-6"
                    >
                      <div class="flex gap-2 scr-l:gap-4">
                        <div class="w-4 scr-l:w-8 rounded-[5px]">🎲</div>
                        <p>Roll Dice</p>
                      </div>
                      <div class="flex gap-2 scr-l:gap-4">
                        <div class="w-4 scr-l:w-8 rounded-[5px]">📥</div>
                        <p>Hold Point</p>
                      </div>
                      <div class="flex gap-2 scr-l:gap-4">
                        <div
                          class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White flex justify-center"
                        >
                          i
                        </div>
                        <p>Item</p>
                      </div>
                    </div>
                  </nav>

                  <ol
                    class="h-[150px] scr-l:rounded-[20px] scr-l:h-[504px] flex flex-col scr-l:gap-8 scr-l:p-[30px] gap-3 bg-White p-2 rounded-[10px] border overflow-y-scroll"
                    v-show="selectTutorial === 1"
                    type="1"
                  >
                    <li><strong>กติกา:</strong></li>
                    <li><strong>จำนวนผู้เล่น</strong>: 2 คน</li>
                    <li><strong>รูปแบบ</strong>:ผลัดเทิร์น</li>
                    <li>
                      <strong>เงื่อนไขการชนะ</strong>: ผู้เล่นคนใดมี
                      <strong>คะแนนสะสม</strong> ถึง 100 แต้มก่อนชนะ
                    </li>

                    <li>
                      <strong>รอบเทิร์น</strong>: ผู้เล่นสี
                      <span
                        class="bg-Main-pink-100 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                      ></span>
                      จะได้สิทธิ์ในการ
                      <strong>Roll Dice 🎲</strong> ,
                      <strong>Hold 📥</strong> และ ใช้ <strong>Item </strong
                      ><span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >
                    </li>
                    <li>
                      <strong>โมฆะ</strong>:
                      เคลียร์คะแนนของผู้เล่นในเทิร์นยกเว้น
                      <strong>คะแนนสะสม</strong> และสลับไปยังเทิร์นอีกฝ่ายทันที
                    </li>

                    <li><strong>การควบคุม:</strong></li>
                    <li>
                      Roll Dice 🎲 : ทอยเต๋าเพื่อรับคะแนนและคะแนนจะถูกเก็บใน
                      <strong>คะแนนปัจจุบัน</strong>
                    </li>
                    <li>
                      Hold 📥: บันทึก <strong>คะแนนปัจจุบัน</strong> ลง
                      <strong>คะแนนสะสม</strong> และสลับไปเทิร์นอีกฝ่ายทันที
                    </li>
                    <li>
                      <strong>แนะนำการเล่น:</strong>
                    </li>
                    <li>
                      1. หาก
                      <strong>Roll Dice 🎲</strong>
                      ผู้เล่นมีโอกาสจะได้คะแนนเพิ่มมากขึ้นในแต่ละเทิร์น
                      เว้นแต่หากลูกใดทอยได้หน้า 1 จะทำให้เป็น
                      <strong>โมฆะ</strong> ทันที
                    </li>
                    <li>
                      2. หาก
                      <strong>Hold 📥</strong>
                      ผู้เล่นจะไม่เสี่ยงต่อการสูญเสียคะแนนและจะทำให้เข้าใกล้
                      <strong>เงื่อนไขการชนะ</strong> มากขึ้น
                      แต่อีกฝ่ายก็ได้โอกาสเช่นกัน
                    </li>
                    <li>
                      3. หากใช้ <strong>Item </strong
                      ><span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >
                      ผู้เล่นสามารถพลิกแพลงสถานการณ์หรือเพิ่มโอกาสในการชนะของตนเองมากขึ้น
                      บางชิ้นมีพลังที่มหาศาลแต่แลกกับความเสี่ยง
                      บางชิ้นอาจดูอ่อนแอแต่หากใช้ถูกเวลาก็ทรงพลังได้เช่นกัน
                    </li>
                    <li class="flex items-center">
                      <strong>กฎ Item </strong
                      ><span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >:
                    </li>

                    <li>
                      <strong>การได้รับ</strong>:
                      เมื่อผู้เล่นทอยเต๋าและออกหน้าที่เหมือนกันทั้งหมดจะได้รับไอเท็มแบบสุ่ม
                      1 ชิ้น <strong>Item </strong
                      ><span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >
                    </li>
                    <li>
                      <strong>การใช้</strong>:
                      ผู้เล่นจะต้องกดคลิกที่ช่องเก็บของตัวเองโดยจะขึ้นสี
                      <span
                        class="bg-Yellow-light w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-Black inline-flex justify-center"
                        >i</span
                      >
                      บ่งบอกสถานะว่า
                      <strong>กำลังจะใช้</strong> โดยมันจะทำงานหลังจากที่ผู้เล่น
                      <strong>Roll Dice 🎲</strong>
                      และจะหายไปทันทีหลังจากทำงานแล้ว
                    </li>
                    <li>
                      <strong>การยกเลิก</strong>: การกดซ้ำอีกครั้งใน
                      <strong>Item </strong>
                      <span
                        class="bg-Yellow-light w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-Black inline-flex justify-center"
                        >i</span
                      >
                      จะเป็นการยกเลิก
                    </li>
                    <li>
                      <strong>ความจุ</strong>:
                      ผู้เล่นแต่ละคนมีกล่องเก็บที่สามารถเก็บ
                      <strong>Item </strong
                      ><span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >
                      ได้สูงสุด 7 ชิ้น
                    </li>
                    <li>
                      <strong>การซ้อนทับ</strong>:ผู้เล่นสามารถใช้
                      <strong>Item </strong
                      ><span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >
                      พร้อมกันได้ทุกชิ้นและสามารถใช้ซ้ำกันได้ในเทิร์นเดียว
                    </li>

                    <li>
                      <strong>Type Item :</strong>
                    </li>
                    <li>
                      <strong>Item Time </strong>
                      <span
                        class="bg-isPerTurn w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >

                      : เมื่อกดใช้จะมีผลเพียงครั้งเดียวเท่านั้น
                    </li>
                    <li>
                      <strong>Item Turn </strong>
                      <span
                        class="bg-isTurn w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >

                      : เมื่อกดใช้จะมีผลตลอดทั้งเทิร์น
                    </li>
                    <li>
                      <strong>Item Attack </strong>
                      <span
                        class="bg-Main-pink-300 w-4 scr-l:w-7 h-4 scr-l:h-7 rounded-[5px] text-White inline-flex justify-center"
                        >i</span
                      >

                      : เมื่อกดใช้จะมีผลกับฝ่ายตรงข้ามทันที
                    </li>
                  </ol>

                  <div
                    v-show="selectTutorial === 2"
                    id="items-box"
                    class="flex gap-2 flex-col scr-l:flex-row scr-l:flex-wrap justify-start scr-l:justify-evenly overflow-scroll scr-l:h-max scr-l:overflow-hidden rounded-md h-[150px]"
                  >
                    <div
                      id="item-box"
                      class="box-item scr-l:w-[560px] scr-l:rounded-[20px] scr-l:p-5 scr-l:h-[120px] bg-White h-[60px] rounded-[10px] flex items-center gap-3 p-2 w-full"
                      v-for="({
                        name,
                        discription,
                        isPerTurn,
                        isAttack,
                      },index) in pollItem" :key="index"
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

                  <form
                    method="dialog"
                    class="justify-center flex w-full px-10"
                  >
                    <button
                      class="btn-close hover:bg-Main-pink-200 scr-l:btn-md btn-xs scr-l:w-[200px] bg-Main-pink-300 text-hss w-full scr-l:text-hs-des bold text-White rounded-[10px] h-[25px] flex justify-center items-center scr-l:rounded-[20px]"
                      id="cancelButton"
                      @click="playSound(soundbtn)"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
            <button
              @click="[reset(), playSound(soundbtn)]"
              class="px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs bg-btn-active border-0 scr-m:h-[39px] scr-m:w-[150px] scr-m:rounded-[30px] scr-l:w-[200px] scr-l:h-[50px]"
            >
              🆕 NEW GAME
            </button>

            <div>
              <button
                class="bg-Yellow-light px-2 text-hss scr-m:text-hs-tal scr-l:text-hs-des shadow-lg text-Black hover:bg-btn-hover btn btn-xs border-0 scr-m:h-[39px] scr-m:w-max scr-m:px-[15px] scr-m:rounded-[30px] scr-l:h-[50px]"
                onclick="setting.showModal()"
                @click="playSound(soundbtn)"
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
                      v-model="currentSetting.settingPoint"
                    />
                  </p>
                  <p class="flex justify-between">
                    Maximum amount of item (0-7)
                    <input
                      class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg text-center"
                      type="text"
                      v-model="currentSetting.limitItem"
                    />
                  </p>
                  <p class="flex justify-between">
                    Amount of add item per time (0-7)
                    <input
                      class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
                      type="text"
                      v-model="currentSetting.addItemNumSetting"
                    />
                  </p>

                  <p class="flex justify-between">
                    Amount of item at start (0-7)
                    <input
                      class="border w-[39px] scr-m:w-[59px] bg-White rounded-lg px-1 text-center"
                      type="text"
                      v-model="currentSetting.startingItem"
                    />
                  </p>
                  <label class="flex gap-2 cursor-pointer">
                    <p>Sound SFX :</p>
                    <div
                      class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des"
                    >
                      <input type="checkbox" v-model="isPlaySoundSF" />
                      <div class="swap-on">🔊</div>
                      <div class="swap-off">🔇</div>
                    </div>
                  </label>
                  <label class="flex gap-2 cursor-pointer">
                    <p>Sound music :</p>
                    <div
                      class="swap swap-flip text-hss scr-m:text-hs-tal scr-l:text-hs-des"
                    >
                      <input type="checkbox" v-model="isPlayMusic" />
                      <div class="swap-on">🔊</div>
                      <div class="swap-off">🔇</div>
                    </div>
                  </label>
                  <div class="flex flex-col gap-2 scr-l:gap-6">
                    <h2>Item Random:</h2>
                    <div
                      class="flex gap-3 flex-wrap text-Black scr-l:justify-between"
                    >
                      <label
                        v-for="(item, index) in pollItem"
                        :key="index"
                        className="flex justify-between w-[50px] scr-m:w-[70px] gap-1  cursor-pointer checked:bg-btn-hover"
                      >
                        <input
                          @click="chooseItems(index)"
                          v-model="checkSelectedItems[index]"
                          type="checkbox"
                          checked="checked"
                          className="checkbox border-2   checkbox-xs scr-m:checkbox-md scr-l:checkbox-lg"
                        />
                        <span>{{ item.name }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="flex justify-center gap-5">
                    <form
                      method="dialog"
                      class="justify-between flex w-full px-10"
                    >
                      <button
                        class="btn-save btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] hover:bg-[#96ff66] rounded-[10px] w-[100px] h-[25px] font-sans btn-xs scr-m:btn-md scr-l:btn-m bg-[#3e8a1b] hover:text-Black"
                        id="saveButton"
                        @click="[btnSaveSetting(), playSound(soundbtn)]"
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
                            <h3 class="font-bold text-lg text-center">
                              ✅Success✅
                            </h3>
                            <p class="py-4 text-center font-bold">
                              Change Successful😊
                            </p>
                          </div>
                          <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </div>
                      <button
                        class="btn text-White border-0 btn-close scr-l:w-[40%] scr-l:rounded-[20px] scr-l scr-l:h-[50px] bg-Main-pink-300 rounded-[10px] w-[100px] h-[25px] btn-xs scr-m:btn-md scr-l:btn-m hover:bg-Main-pink-100 hover:text-Black"
                        id="cancelButton"
                        @click="[playSound(soundbtn),btnCloseSetting()]"
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <div
            id="dices "
            class="flex z-0 gap-3 justify-center w-max mx-3 h-max pb-[2px] scr-l:pb-[10px] scr-m:gap-[32px]"
          >
            <img
              v-for="(dice, index) in dices"
              :key="index"
              class="max-h-[54px] scr-m:max-h-[81px] scr-l:max-h-[105px] min-h-0 scr-l:rounded-[30px] rounded-[20px] scr-m:rounded-[30px] shadow-lg"
              :src="diceFace[dice - 1]"
              :alt="'dice' + dice"
            />
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
                  itemInfo: { name, isPerTurn, isAttack },
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
                <p class="swap-off">{{ name }}</p>
                <p class="swap-on">{{ name }}</p>
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
                  itemInfo: { name, isPerTurn, isAttack },
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
                <p class="swap-off">{{ name }}</p>
                <p class="swap-on">{{ name }}</p>
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
