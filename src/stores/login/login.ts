import { CACHE_NAME, CACHE_PASSWORD, LOGIN_TOKEN, LOGIN_USERINFO, USER_MENULIST } from "@global/constants"
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from "@/service/login/login"
import type { IAccount, ILoginStore } from "@/types"
import { localCache } from "@utils/cache"
import router from "@/router"
import { getFlatArr, getShowMenuList, getAllBreadcrumbList } from "@/utils/route"

const useLoginStore = defineStore("LoginState", {
	state: (): ILoginStore => ({
		token: localCache.getCache(LOGIN_TOKEN) ?? "",
		userInfo: localCache.getCache(LOGIN_USERINFO) ?? "",
		userMenuList: localCache.getCache(USER_MENULIST) ?? []
	}),
	getters: {
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.userMenuList),
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
		showMenuListGet: state => getShowMenuList(state.userMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.userMenuList)
	},
	actions: {
		async loginAccountAction(account: IAccount, remermber: boolean) {
			// 账号登陆，获取token信息
			const loginResult = await accountLoginRequest(account)
			if (!loginResult.data) return
			this.token = loginResult.data.token
			localCache.setCache(LOGIN_TOKEN, this.token)
			const id = loginResult.data.id

			// 获取登陆用户详细信息
			const userInfoResult = await getUserInfoById(id)
			if (!userInfoResult.data) return
			this.userInfo = userInfoResult.data
			localCache.setCache(LOGIN_USERINFO, userInfoResult.data)

			// 根据角色请求用户的权限
			if (!this.userInfo.role) return
			const userMenuListResult = await getUserMenuByRoleId(this.userInfo.role.id)
			if (!userMenuListResult.data) return
			this.userMenuList = userMenuListResult.data.menu
			localCache.setCache(USER_MENULIST, userMenuListResult.data.menu)

			// 记住密码
			if (remermber) {
				localCache.setCache(CACHE_NAME, account.name)
				localCache.setCache(CACHE_PASSWORD, account.password)
			} else {
				localCache.removeCache(CACHE_NAME)
				localCache.removeCache(CACHE_PASSWORD)
			}

			router.push("/main")
		}
	}
})

export default useLoginStore
