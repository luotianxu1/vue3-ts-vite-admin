export interface IAccount {
	name: string
	password: string
}

export interface IAccountResult {
	id: string
	name: string
	token: string
}

export interface IUserInfo {
	id?: string
	name?: string
	cellphone?: number
	enable?: number
	createTime?: string
	updateTime?: string
	img: string
	role?: {
		id: string
		name: string
		intro: string
	}
	department?: {
		id: string
		name: string
		parentId: any
		leader: any
	}
}

export interface Menu {
	id: number
	name: string
	type: number
	url: string
}

export interface MenuListResult {
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
