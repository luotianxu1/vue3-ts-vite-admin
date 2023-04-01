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
	menu: Menu[]
}

export interface ILoginStore {
	token: string
	userInfo: IUserInfo
	userMenuList: Menu[]
}
