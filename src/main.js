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
	// เป็นเมธอดจาก Web Performance API ที่มันจะให้ข้อมูลการนำทางเวลาเข้าเว็ปซึ่งอ้างผ่าน type navigation มันจะคืนค่าเป็น array obj ที่โหลดหน้าเว็ป
	const navigationEntries = performance.getEntriesByType("navigation")
	// เช็คกันไว้ก่อนพรี่แชทสอนมาเผื่อระบบเรามั่วมีการบันทึก api ข้างไว้ใน performance ละจารสอนว่ากันการเกิด recursive
	if (navigationEntries.length > 0) {
		if (navigationEntries[0].type === "reload") {
			//ก็อ้าง type ว่าเป็น reload ไหมถ้าใช่ก็ให้กลับไปหน้า homepage
			router.push({ path: "/" })
		}
	}
})

// createApp(GamePage).mount("#app");
