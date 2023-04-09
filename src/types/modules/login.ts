import type { IUserInfo } from "./user"

// 登陆
export interface IAccountReq {
	name: string
	password: string
}

export interface IAccountResult {
	id: string
	name: string
	token: string
}

export interface IMenuListResult {
	menu: IMenuOptions[]
}

export interface ILoginStore {
	token: string
	userInfo: IUserInfo
	userMenuList: IMenuOptions[]
}

// 路由
export interface IMetaProps {
	icon: string
	title: string
	activeMenu?: string
	isLink?: string
	isHide: boolean
	isFull: boolean
	isAffix: boolean
	isKeepAlive: boolean
}

export interface IMenuOptions {
	path: string
	name: string
	component?: string | (() => Promise<any>)
	redirect?: string
	meta: IMetaProps
	children?: IMenuOptions[]
}
