import "./assets/main.css";

import { createApp } from "vue";
import HomePage from "./views/HomePage.vue";
import GamePage from "./views/GamePage.vue";
import CustomItemPageV2 from "./views/CustomItemPageV2.vue";
// createApp(CustomItemPageV2).mount("#app");
createApp(HomePage).mount("#app");
// createApp(GamePage).mount("#app");
