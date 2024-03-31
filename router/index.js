import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import GamePage from "@/views/GamePage.vue";
import CustomItemPage from "@/views/CustomItemPage.vue";
const history = createWebHistory(import.meta.env.HOME_URL);
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {

    path: "/game",
    name: "GamePage",
    component: GamePage,
  },
  { path: "/custom", name: "CustomItem", component: CustomItemPage },
  { path: "/home", name: "HomePage", component: HomePage },
];

const router = createRouter({
  history,
  routes,
});

export default router;
