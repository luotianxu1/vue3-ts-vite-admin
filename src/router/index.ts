import { LOGIN_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			redirect: "/login"
		},
		{
			path: "/login",
			name: "login",
			component: () => import("@views/login/Login.vue")
		},
		{
			path: "/main",
			name: "main",
			component: () => import("@views/main/Main.vue")
		},
		{
			path: "/:pathMatch(.*)",
			component: () => import("@views/not-fount/404.vue")
		}
	]
})

//导航守卫
router.beforeEach((to, form, next) => {
	const token = localCache.getCache(LOGIN_TOKEN)
	if (!token && to.path === "/main") next("/login")
	next()
})

export default router
