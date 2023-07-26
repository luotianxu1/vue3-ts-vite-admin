import { GLOB_APP_HOME } from "@/global/constants"
import type { RouteRecordRaw } from "vue-router"

// export type AppRouteRecordRaw = RouteRecordRaw & {
// 	hidden?: boolean
// }

export const staticRouter: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: GLOB_APP_HOME
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@views/login/Login.vue")
	},
	{
		path: "/base",
		name: "base",
		component: () => import("@/components/layout/index.vue"),
		redirect: GLOB_APP_HOME,
		children: []
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/error/404.vue")
	}
]

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	redirect: { name: "404" }
}
