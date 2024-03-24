import "./assets/main.css"

import { createApp } from "vue"
import HomePage from "./views/HomePage.vue"
import GamePage from "./views/GamePage.vue"
import CustomItemPageV2 from "./views/CustomItemPageV2.vue"
import App from "./App.vue"
import router from "../router/index.js"

// createApp(CustomItemPageV2).mount("#app");
// createApp(HomePage).mount("#app")
createApp(App).use(router).mount("#app")
router.isReady().then(() => {
	if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
		router.push({ path: "/" })
	}
})
// createApp(GamePage).mount("#app");
