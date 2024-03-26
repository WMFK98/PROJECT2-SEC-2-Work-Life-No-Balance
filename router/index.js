import { createRouter, createWebHistory } from "vue-router"
import HomePage from "@/views/HomePage.vue"
import GamePage from "@/views/GamePage.vue"
import CustomItemPageV2 from "@/views/CustomItemPageV2.vue"
const history = createWebHistory(import.meta.env.HOME_URL)
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
	{ path: "/custom", name: "CustomItem", component: CustomItemPageV2 },
	{ path: "/home", name: "HomePage", component: HomePage },
]

const router = createRouter({
	history,
	routes,
})

export default router
