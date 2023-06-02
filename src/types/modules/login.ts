// 登陆请求
export interface IAccountReq {
	name: string
	password: string
}

// 登陆返回
export interface IAccountResult {
	id: string
	name: string
	token: string
}

// 菜单返回
export interface IMenuListResult {
	menu: IMenuOptions[]
}

// 路由
export interface IMetaProps {
	icon: string
	title: string
	activeMenu?: string
	isLink?: string
	isHide: boolean
	isFull: boolean
	isKeepAlive: boolean
}

// 路由
export interface IMenuOptions {
	path: string
	name: string
	component?: string | (() => Promise<any>)
	redirect?: string
	meta: IMetaProps
	children?: IMenuOptions[]
	permission?: string
}
