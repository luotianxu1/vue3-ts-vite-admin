import {
	CACHE_NAME,
	CACHE_PASSWORD,
	GLOB_APP_HOME,
	USER_TOKEN,
	USER_INFO,
	USER_MENULIST,
	GLOB_APP_LOGIN
} from "@global/constants"
import { accountLoginRequest, getUserInfoById, getUserMenuByRoleId } from "@/service/modules/login"
import type { IAccountReq, ILoginStore } from "@/types"
import { localCache } from "@utils/cache"
import router from "@/router"
import { getFlatArr, getShowMenuList, getAllBreadcrumbList, getAllPermissions } from "@/utils/route"
import { ElNotification } from "element-plus"

export const UserStore = defineStore("UserStore", {
	state: (): ILoginStore => ({
		token: localCache.getCache(USER_TOKEN) ?? "",
		userInfo: localCache.getCache(USER_INFO) ?? {},
		userMenuList: localCache.getCache(USER_MENULIST) ?? []
	}),
	getters: {
		// 扁平化之后的一维数组路由，主要用来添加动态路由
		flatMenuListGet: state => getFlatArr(state.userMenuList),
		// 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true 和按钮权限
		showMenuListGet: state => getShowMenuList(state.userMenuList),
		// 所有面包屑导航列表
		breadcrumbListGet: state => getAllBreadcrumbList(state.userMenuList),
		// 所有按钮权限
		permissionsListGet: state => getAllPermissions(state.userMenuList)
	},
	actions: {
		/**
		 * 用户登陆
		 * @param account 用户名和密码
		 * @param remermber 是否记住密码
		 * @returns
		 */
		async loginAccountAction(account: IAccountReq, remermber: boolean) {
			// 账号登陆，获取token信息
			const loginResult = await accountLoginRequest(account)
			if (!loginResult.data) return
			this.token = loginResult.data.token
			localCache.setCache(USER_TOKEN, this.token)
			const id = loginResult.data.id

			// 获取登陆用户详细信息
			const userInfoResult = await getUserInfoById(id)
			if (!userInfoResult.data) return
			this.userInfo = userInfoResult.data
			localCache.setCache(USER_INFO, userInfoResult.data)

			// 记住密码
			if (remermber) {
				localCache.setCache(CACHE_NAME, account.name)
				localCache.setCache(CACHE_PASSWORD, account.password)
			} else {
				localCache.removeCache(CACHE_NAME)
				localCache.removeCache(CACHE_PASSWORD)
			}

			// 跳转主页
			router.push(GLOB_APP_HOME)
		},
		/**
		 * 退出登陆
		 */
		logoutAccountAction() {
			// 删除token
			localCache.removeCache(USER_TOKEN)
			localCache.removeCache(USER_INFO)
			localCache.removeCache(USER_MENULIST)
			// 跳回登陆页面
			router.push(GLOB_APP_LOGIN)
		},
		/**
		 * 根据角色id查询菜单
		 */
		async getUserMenuList() {
			if (!this.userInfo.role) return
			const userMenuListResult = await getUserMenuByRoleId(this.userInfo.role.id)
			if (!userMenuListResult.data) return
			this.userMenuList = userMenuListResult.data.menu

			// 判断当前用户有没有菜单权限
			if (!this.userMenuList.length) {
				ElNotification({
					title: "无权限访问",
					message: "当前账号无任何菜单权限，请联系系统管理员！",
					type: "warning",
					duration: 3000
				})
				this.logoutAccountAction()
				router.replace(GLOB_APP_LOGIN)
				return Promise.reject("暂无权限！")
			}
		}
	}
})
