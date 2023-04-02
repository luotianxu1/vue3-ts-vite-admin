import { defineStore } from "pinia"
import piniaPersistConfig from "@/utils/piniaPersist"
import router from "@/router/index"
import { GLOB_APP_HOME, DEFAULT_PRIMARY, TABS_BLACK_LIST } from "@/global/constants"
import dayjs from "dayjs"
import type { GlobalState, IRouterList, ThemeConfigProps } from "@/types"

export const GlobalStore = defineStore("GlobalState", {
	state: (): GlobalState => ({
		// 系统语言
		language: "zh",
		// 当前页面路由
		routerActive: GLOB_APP_HOME,
		// 历史路由
		routerList: [{ title: "首页", path: GLOB_APP_HOME, icon: "icon-home", close: false }],
		// 分页页数
		pageSize: 30,
		// 系统时间
		systemTime: 0,
		themeConfig: {
			// 主题色
			primary: DEFAULT_PRIMARY,
			// 布局
			layout: "vertical",
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true,
			// 页脚
			footer: true
		}
	}),
	getters: {
		systemTimeFormat(state) {
			return dayjs(state.systemTime).format("YYYY-MM-DD HH:mm:ss")
		}
	},
	actions: {
		// 添加tab
		addTabs(tabItem: IRouterList) {
			if (TABS_BLACK_LIST.includes(tabItem.path)) {
				return
			}
			const tabInfo: IRouterList = {
				title: tabItem.title,
				path: tabItem.path,
				icon: tabItem.icon,
				close: tabItem.close
			}
			if (this.routerList.every(item => item.path !== tabItem.path)) {
				this.routerList.push(tabInfo)
			}
			this.setTabsMenuValue(tabItem.path)
		},
		// 删除tab
		removeTabs(tabPath: string) {
			let routerActive = this.routerActive
			const routerList = this.routerList
			if (routerActive === tabPath) {
				routerList.forEach((item, index) => {
					if (item.path !== tabPath) {
						return
					}
					const nextTab = routerList[index + 1] || routerList[index - 1]
					if (!nextTab) {
						return
					}
					routerActive = nextTab.path
					router.push(nextTab.path)
				})
			}
			this.routerActive = routerActive
			this.routerList = routerList.filter(item => item.path !== tabPath)
		},
		// 设置当前路由
		setTabsMenuValue(routerActive: string) {
			this.routerActive = routerActive
		},
		// 关闭其他
		closeMultipleTab(tabsMenuValue?: string) {
			this.routerList = this.routerList.filter(item => {
				return item.path === tabsMenuValue || item.path === GLOB_APP_HOME
			})
		},
		// 关闭所有
		goHome() {
			router.push(GLOB_APP_HOME)
			this.routerActive = GLOB_APP_HOME
		},
		// 设置主题
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig
		}
	},
	persist: piniaPersistConfig("GlobalState")
})
