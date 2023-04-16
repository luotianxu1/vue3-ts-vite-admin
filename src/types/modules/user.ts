// 用户信息
export interface IUserInfo {
	id?: string
	name?: string
	cellphone?: number
	enable?: number
	createTime?: string
	updateTime?: string
	img?: string
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

// 查询用户返回值
export interface IPageListResult {
	list: IUserInfo[]
	total: number
}
