import "./assets/main.css"

<<<<<<< Updated upstream
import { createApp } from "vue";
import App from "./App.vue";
import CustomItemPage from "./CustomItemPage.vue";
createApp(CustomItemPage).mount("#app");
// createApp(App).mount("#app");
=======
import { createApp } from "vue"
import HomePage from "./views/HomePage.vue"
import GamePage from "./views/GamePage.vue"
import CustomItemPage from "./views/CustomItemPage.vue"
import router from "../router/index.js"
import App from "./App.vue"

// createApp(CustomItemPage).use(router).mount("#app")
// createApp(HomePage).use(router).mount("#app")
// createApp(GamePage).mount("#app");
// เล้งเพิ่ม
router.isReady().then(() => {
	if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
		router.push({ path: "/" })
	}
})

createApp(App).use(router).mount("#app")
>>>>>>> Stashed changes
