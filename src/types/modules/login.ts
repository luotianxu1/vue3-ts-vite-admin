// 登录相关
export namespace Login {
	// 登陆请求
	export interface IReqLogin {
		name: string
		password: string
	}

	// 登陆返回
	export interface IResLogin {
		id: string
		name: string
		token: string
	}
}
