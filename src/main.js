import "./assets/main.css";

import { createApp } from "vue";
import HomePage from "./views/HomePage.vue";
import GamePage from "./views/GamePage.vue";
import CustomItemPage from "./views/CustomItemPage.vue";
createApp(GamePage).mount("#app");
// createApp(HomePage).mount("#app");
// createApp(GamePage).mount("#app");
