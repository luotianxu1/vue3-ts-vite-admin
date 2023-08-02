// 用户相关
export namespace User {
	// 用户信息
	export interface IUserInfo {
		id?: string
		name?: string
		age?: number
		gender: number
		phone?: number
		email?: string
		city?: string
		status?: number
		type?: number
		img?: string
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

	// 查询用户列表返回值
	export interface IResUserList {
		list: IUserInfo[]
		total: number
	}
}
