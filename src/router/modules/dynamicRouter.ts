import { GLOB_APP_LOGIN } from "@/global/constants"
import { UserStore } from "@/stores/modules/user"
import { isType } from "@/utils/global"
import router from ".."
import { notFoundRouter } from "./staticRouter"

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.vue")

/**
 * 初始化动态路由
 * @returns
 */
export const initdynamicRouter = async () => {
	const userStore = UserStore()

	try {
		// 获取菜单列表
		await userStore.getUserMenuList()

		// 添加动态路由
		userStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children
			if (item.component && isType(item.component) === "string") {
				item.component = modules["/src/views" + item.component + ".vue"]
			}

			if (item.meta.isFull) {
				router.addRoute(item)
			} else {
				router.addRoute("base", item)
			}
		})

		// 最后添加 notFoundRouter
		router.addRoute(notFoundRouter)
	} catch (error) {
		router.replace(GLOB_APP_LOGIN)
		return Promise.reject(error)
	}
}
