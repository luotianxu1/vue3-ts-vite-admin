import { GLOB_APP_HOME, GLOB_APP_LOGIN, GLOB_APP_TITLE, RROUTER_WHITLE, USER_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import { createRouter, createWebHashHistory } from "vue-router"
import NProgress from "@/global/nprogress"
import { staticRouter } from "./modules/staticRouter"
import { UserStore } from "@/stores/modules/user"
import { initdynamicRouter } from "./modules/dynamicRouter"

const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior: () => {
		return { top: 0, left: 0 }
	},
	routes: staticRouter
})

//导航守卫
router.beforeEach(async (to, form, next) => {
	// NProgess开始
	NProgress.start()

	// 动态设置标题
	document.title = to.meta.title ? `${to.meta.title} - ${GLOB_APP_TITLE}` : GLOB_APP_TITLE

	// 获取token
	const token = localCache.getCache(USER_TOKEN)

	// 已登录状态进入登录页面跳转主页
	if (token && to.path === GLOB_APP_LOGIN) {
		return next({ path: GLOB_APP_HOME })
	}

	// 判断是否在白名单
	if (RROUTER_WHITLE.indexOf(to.path) > -1) {
		return next()
	}

	// 判断是否有 Token，没有重定向到 login
	if (!token) return next({ path: GLOB_APP_LOGIN, replace: true })

	// 如果没有菜单列表，就重新请求菜单列表并添加动态路由
	const userStore = UserStore()
	if (!userStore.userMenuList.length) {
		await initdynamicRouter()
		return next({ ...to, replace: true })
	}

	next()
})

router.afterEach(() => {
	NProgress.done()
})

router.onError(error => {
	NProgress.done()
	console.warn("路由错误", error.message)
})

export default router
