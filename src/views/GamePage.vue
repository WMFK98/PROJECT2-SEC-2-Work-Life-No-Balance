<script setup>
import { reactive, ref, watch, onMounted } from 'vue';
import TypeItem from './../TypeItem';
import { random } from './../utils/tool';
import ItemManagement from './../libs/ItemsManagement';
import initStructureItem from './../initStructureItem';
import { useRouter } from 'vue-router';
import soundAddItem from '/music/addItem.mp3';
import soundHold from '/music/holdsound.mp3';
import soundWin from '/music/toothless.mp3';
import soundSwap from '/music/swapsound.mp3';
import backgroundMusic from '/music/backgroundMusic.mp3';
import Item from './../StateItem';
import ButtonGame from './../components/buttons/ButtonGame.vue';
import DisplayDice from './../components/other/DisplayDice.vue';
import HowtoPlayPopup from './../components/popups/HowtoPlayPopup.vue';
import SettingPopup from './../components/popups/SettingPopup.vue';
import InputSetting from './../components/fieldinputs/InputSetting.vue';
import ToggleSetting from './../components/fieldinputs/ToggleSetting.vue';
import CheckboxsSetting from './../components/fieldinputs/CheckboxsSetting.vue';
import ButtonSetting from './../components/buttons/ButtonSetting.vue';
import ButtonMini from './../components/buttons/ButtonMini.vue';
import LogPopup from './../components/popups/LogPopup.vue';
import ListItem from './../components/items/ListItem.vue';
import CurrentPoint from './../components/other/CurrentPoint.vue';
import SwitchSide from './../components/other/SwitchSide.vue';
import SwitchSideLower from './../components/other/SwitchSideLower.vue';
import {
  playSoundSFX,
  playSoundMusic,
  toggleSoundMusic,
  toggleSoundSFX,
  stopMusic,
  setSoundDefault,
  setSound,
} from './../libs/SoundControl';
import { useCustom } from '@/stores/TypeItemsCusMangement';

const route = useRouter();
const logDice = [];
const customItemManager = useCustom();
let voidScore = 1;
const theWinner = ref(null);
let pollItem = [];
let checkSelectedItems = reactive([]);
let givePoint = 0;
let dices = reactive([1, 1]);
let phaseGame = 0;
let currentItemSelected = [];
const itemSelectedForm = reactive([]);

const updateTypeItemEnable = (typeItem) => {
  const sameItemIndex = itemSelectedForm.findIndex(
    ({ id }) => id === typeItem.id
  );
  if (sameItemIndex === -1) itemSelectedForm.push(typeItem);
  else itemSelectedForm.splice(sameItemIndex, 1);
};

const musicSetting = reactive({});

let defaultSetting = localStorage.getItem('settings')
  ? JSON.parse(localStorage.getItem('settings'))
  : {
      settingPoint: 100,
      limitItem: 7,
      addItemNumSetting: 1,
      startingItem: 0,
      musicSetting: { isOffMusic: false, isOffSFX: false },
    };

const currentSetting = reactive({ ...defaultSetting });

const player1 = reactive({
  name: 'p1',
  point: 0,
  curPoint: 0,
  items: new ItemManagement('p1', pollItem),
  buff: [],
});

const player2 = reactive({
  name: 'p2',
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

const itemRollDice = new Item(
  new TypeItem(
    'rollDice',
    rollDiceAbility,
    2,
    'Base Ability to roll dice',
    false
  )
);

const updateMusicSetting = (e, name) => {
  if (name == 'isOffMusic') {
    musicSetting.isOffMusic = e.openSound;
  } else {
    musicSetting.isOffSFX = e.openSound;
  }
};

const reset = () => {
  stopMusic();
  phaseGame = 0;
  resetDice();
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
    playSoundMusic(soundWin);
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
      playSoundSFX(soundAddItem);
  }
};

const isVoidScore = () => dices.some((dice) => dice <= voidScore);

const activeItem = () => {
  const customItem = [];
  currentPlayer[0].items.getAllItemUsed().forEach((item) => {
    if (Array.isArray(item.itemInfo.ability)) {
      item.itemInfo.ability.forEach((itemObj) => {
        customItem.push({
          itemInfo: {
            ...item.itemInfo,
            ability: itemObj.ability,
            priority: itemObj.priority,
          },
        });
      });
    }
  });
  const starterItem = currentPlayer[0].items
    .getAllItemUsed()
    .filter((el) => !Array.isArray(el.itemInfo.ability));
  const orderPriorityItem = [
    itemRollDice,
    ...starterItem,
    ...customItem,
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
  if (logDice.length) {
    logDice.forEach((log) => (log ? dices.pop() : dices.push(1)));
    logDice.splice(0, logDice.length);
  }
};

const roll = () => {
  playSoundMusic(backgroundMusic);
  resetDice();
  phaseGame = 1;
  activeItem();
  if (!isVoidScore()) return (currentPlayer[0].curPoint += givePoint);
  switchPlayer();
  playSoundSFX(soundSwap);
};

const hold = () => {
  currentPlayer[0].items.unUsedAllItem();
  currentPlayer[0].point += currentPlayer[0].curPoint;
  currentPlayer[0].curPoint = 0;
  switchPlayer();
};

const resetSetting = () => {
  currentSetting.settingPoint = 100;
  currentSetting.limitItem = 7;
  currentSetting.addItemNumSetting = 1;
  currentSetting.startingItem = 0;
  setSoundDefault();
  musicSetting.isOffMusic = false;
  musicSetting.isOffSFX = false;
  checkSelectedItems = checkSelectedItems.fill(true);

  itemSelectedForm.splice(0, itemSelectedForm.length);
  itemSelectedForm.push(...pollItem.slice(0, 7));
};

const commitSeletedItem = (itemSelectedForm) => {
  currentItemSelected = [...itemSelectedForm];
  pollItem.forEach((item) => (item.isEnable = false));
  currentItemSelected.forEach((item) => (item.isEnable = true));
};

const closeSetting = () => {
  currentSetting.limitItem = defaultSetting.limitItem;
  currentSetting.addItemNumSetting = defaultSetting.addItemNumSetting;
  currentSetting.settingPoint = defaultSetting.settingPoint;
  currentSetting.startingItem = defaultSetting.startingItem;
  itemSelectedForm.splice(0, itemSelectedForm.length);
  itemSelectedForm.push(...currentItemSelected);
};

const saveSetting = () => {
  const isInteger = (input, min, max) => {
    if (input === '') return false;
    const isValidInput = !isNaN(input) && Number.isInteger(Number(input));
    if (isValidInput && min !== 'undefined' && max !== 'undefined') {
      return input >= min && input <= max;
    }
    return isValidInput;
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
  commitSeletedItem(itemSelectedForm);
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
    logDice.push(1);
  };

  const X2P50Abililty = () => {
    if (phaseGame === 0) return;
    voidScore = 3;
    givePoint = givePoint * 2;
  };

  const guarantee6Ability = () => {
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
    if (phaseGame === 0 || isVoidScore()) return;
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
    logDice.push(0);
  };

  const plus2Abililty = () => {
    if (phaseGame === 0) return;
    givePoint = givePoint + 2;
  };

  const { G6, N10C, OAE, X2P50, addDice, plus2Point, popDice } =
    initStructureItem;
  G6.addAbility(guarantee6Ability);
  N10C.addAbility(N10Ability);
  OAE.addAbility(OAEAbililty);
  X2P50.addAbility(X2P50Abililty);
  addDice.addAbility(addDiceAbililty);
  plus2Point.addAbility(plus2Abililty);
  popDice.addAbility(popDiceAbililty);
  pollItem.push(X2P50, addDice, G6, N10C, OAE, popDice, plus2Point);

  const newCustomItems = customItemManager
    .getAllTypeItems()
    .map((oldTypeItem) => {
      const ability = [];
      oldTypeItem.ability.forEach((textAbility) => {
        const itemSearch = pollItem.find(({ name }) => name === textAbility);
        if (itemSearch) ability.push(itemSearch);
      });
      const newitem = new TypeItem(
        oldTypeItem.name,
        ability,
        null,
        null,
        oldTypeItem.isPerTurn,
        oldTypeItem.isAttack,
        null,
        true,
        oldTypeItem.id
      );
      return newitem;
    });
  pollItem.push(...newCustomItems);
};

const getLocalSetting = () => {
  if (!localStorage.getItem('settings')) {
    localStorage.setItem('settings', JSON.stringify(defaultSetting));
  }

  const storedItemSelected = JSON.parse(localStorage.getItem('settings'))
    .storedItemSelected?.map(({ id }) => {
      return pollItem.find((item) => item.id === id);
    })
    .filter((item) => item);
  const defaultItemSelected = storedItemSelected
    ? storedItemSelected
    : [...pollItem.filter(({ isEnable }) => isEnable)];
  commitSeletedItem(defaultItemSelected);
  itemSelectedForm.push(...currentItemSelected);
};

const rollBack = () => {
  closeSetting();
  stopMusic();
  route.go(-1);
};

const init = () => {
  watch(() => [player1.point, player2.point], checkWin);
  watch(() => [player1.curPoint, player2.curPoint], checkAddItem);
  initItem();
  getLocalSetting();
  watch(
    [currentSetting, musicSetting],
    ([newSetting, newMusicSetting]) => {
      const storedSettings = JSON.parse(localStorage.getItem('settings')) || {};
      const newVal = {
        ...storedSettings,
        ...newSetting,
        musicSetting: { ...newMusicSetting },
      };
      localStorage.setItem('settings', JSON.stringify(newVal));
      setSound(newMusicSetting);
    },
    { deep: true }
  );

  watch(
    [itemSelectedForm],
    ([newStoredItemSelected]) => {
      const storedSettings = JSON.parse(localStorage.getItem('settings')) || {};
      const newVal = {
        ...storedSettings,
        storedItemSelected: newStoredItemSelected.map((item) => {
          return item;
        }),
      };
      localStorage.setItem('settings', JSON.stringify(newVal));
    },
    { deep: true }
  );
};

onMounted(() => {
  if (!localStorage.getItem('settings')) {
    musicSetting.isOffMusic = false;
    musicSetting.isOffSFX = false;
  }
  const myMusic = JSON.parse(localStorage.getItem('settings')).musicSetting;
  musicSetting.isOffMusic = myMusic.isOffMusic;
  musicSetting.isOffSFX = myMusic.isOffSFX;
  setSound(myMusic);
  reset();
});

init();
</script>

<template>
  <div
    v-show="theWinner"
    class="absolute overflow-hidden w-screen h-screen z-10 animate-duration-5000 flex animate-jump-in"
  >
    <img
      :src="theWinner === player1 ? '/gif/winner-1.gif' : '/gif/winner-2.gif'"
      class="m-auto w-[50%]"
    />
    <img
      src="/gif/win-effect-4.gif"
      class="left-0 top-0 absolute w-[40%]"
      alt=""
    />
    <img
      src="/gif/win-effect-4.gif"
      class="right-0 top-0 absolute w-[40%]"
      alt=""
    />

    <img
      src="/gif/win-effect-1.gif"
      class="-left-[5%] bottom-0 absolute w-[40%]"
      alt=""
    />
    <img
      src="/gif/win-effect-2.gif"
      class="-right-[5%] bottom-0 absolute w-[40%]"
      alt=""
    />
  </div>
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
            <ButtonMini title="📖" onclick="tutorial.showModal()" />
            <HowtoPlayPopup id="tutorial" />

            <ButtonGame
              class="z-20"
              title="🆕 NEW GAME"
              buttonStyle="static"
              :action="reset"
            />
            <ButtonMini title="⚙️" onclick="setting.showModal()" />
            <SettingPopup>
              <template #title>
                <div class="flex mb-3">
                  <form method="dialog" class="flex flex-1">
                    <ButtonSetting
                      class="w-max rounded-full scr-m:rounded-full scr-l:rounded-full"
                      title="X"
                      :action="closeSetting"
                      style-type="close"
                    />
                  </form>

                  <h3 class="font-bold flex-[6] text-center text-m">
                    SETTING MENU
                  </h3>

                  <ButtonSetting
                    class="flex-1"
                    title="Home Page"
                    :action="rollBack"
                    style-type="close"
                  />
                </div>
              </template>
              <template #inputSetting>
                <div class="w-full flex items-center justify-between">
                  <p>Set :</p>
                  <div class="w-max scr-l:w-[400px] flex justify-end">
                    <ButtonSetting
                      title="Default Setting"
                      :action="resetSetting"
                      style-type="default"
                    />
                  </div>
                </div>
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
                  show-on="🔊"
                  show-off="🔇"
                  :action="toggleSoundMusic"
                  :openSound="musicSetting.isOffMusic"
                  @update="updateMusicSetting($event, 'isOffMusic')"
                />
                <ToggleSetting
                  title="Sound SFX"
                  :action="toggleSoundSFX"
                  show-on="🔊"
                  show-off="🔇"
                  :openSound="musicSetting.isOffSFX"
                  @update="updateMusicSetting($event, 'isOffSFX')"
                />
              </template>

              <template #checkboxSetting>
                <CheckboxsSetting
                  @enableItem="updateTypeItemEnable"
                  title="Item Random:"
                  :checkboxs="itemSelectedForm"
                  :values="pollItem"
                />
              </template>
              <template #submit>
                <ButtonSetting
                  title="Save"
                  :action="saveSetting"
                  style-type="save"
                />
                <ButtonSetting
                  title="Cancel"
                  :action="closeSetting"
                  style-type="close"
                />

                <LogPopup
                  type="errorModal"
                  title="❌Something went wrong❌"
                  log="Invalid Value! Please try again."
                />
                <LogPopup
                  type="successModal"
                  title="✅Success✅"
                  log="Nice!!, we hope you enjoy."
                />
              </template>
            </SettingPopup>
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
            ></ListItem
          ></template>
        </SwitchSideLower>
        <SwitchSideLower
          :player="player2"
          :the-winner="theWinner"
          :current-player="currentPlayer[0]"
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
            ></ListItem></template
        ></SwitchSideLower>
        <div
          class="absolute flex flex-col gap-[16px] mt-5 scr-m:mt-20 scr-l:mt-[125px] items-center"
        >
          <ButtonGame
            :disabled="theWinner !== null"
            title="🎲 ROLL DICE"
            buttonStyle="normal"
            :action="roll"
          />
          <ButtonGame
            :disabled="theWinner !== null"
            title="📥 Hold"
            buttonStyle="short"
            :action="hold"
            :sound-s-f-x="soundHold"
          />
        </div>
      </div>
    </div>
  </div>
</template>
