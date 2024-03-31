import "./assets/main.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "../router/index.js";

createApp(App).use(router).use(createPinia()).mount("#app");
router.isReady().then(() => {
  const navigationEntries = performance.getEntriesByType("navigation");
  if (navigationEntries.length > 0) {
    if (navigationEntries[0].type === "reload") {
      router.push({ path: "/" });
    }
  }
});
