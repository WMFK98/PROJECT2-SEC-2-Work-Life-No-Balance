<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import TypeItem from "./TypeItem";
import { random } from "./tool";
import ItemManagement from "./ItemsManagement";
import initStructureItem from "./initStructureItem";

import soundbtn from "/music/soundBtn.mp3";
import soundAddItem from "/music/addItem.mp3";
import soundHold from "/music/holdsound.mp3";
import soundWin from "/music/toothless.mp3";
import soundSwap from "/music/swapsound.mp3";
import Item from "./Item";

import ButtonGame from "./components/ButtonGame.vue";
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
import SwitchSide from "./components/SwitchSide.vue";
import SwitchSideLower from "./components/SwitchSideLower.vue";
import ItemsInfo from "./components/ItemsInfo.vue";
import {
  playSoundSFX,
  playSoundMusic,
  toggleSoundMusic,
  toggleSoundSFX,
  stopMusic,
  setSoundDefault,
  setSound,
} from "./SoundControl";


</template>
