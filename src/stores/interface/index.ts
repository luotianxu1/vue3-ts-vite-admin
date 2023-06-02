import type { IMenuOptions } from "@/types/modules/login"
import type { IUserInfo } from "@/types/modules/user"

// 登陆相关Store
export interface ILoginStore {
	token: string
	userInfo: IUserInfo
	userMenuList: IMenuOptions[]
}

export interface GlobalState {
	language: string
	routerActive: string
	routerList: IRouterList[]
	pageSize: number
	systemTime: number
	themeConfig: ThemeConfigProps
}

export interface IRouterList {
	title: string
	path: string
	icon: string
	close: boolean
}

export interface ThemeConfigProps {
	primary: string
	layout: "vertical" | "transverse" | "classic" | "columns"
	isDark: boolean
	isGrey: boolean
	isCollapse: boolean
	breadcrumb: boolean
	breadcrumbIcon: boolean
	tabs: boolean
	tabsIcon: boolean
	footer: boolean
}
