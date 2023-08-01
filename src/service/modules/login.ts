import api from "../index"
import type { Login, IResponseData, User, Menu } from "@/types"

export function accountLoginRequest(account: Login.IReqLogin) {
	return api.post<IResponseData<Login.IResLogin>>({
		url: "/login",
		data: account
		//   interceptors: {
		//     requsetInterceptor: config => {
		//       return config
		//     }
		//   },
		// showLoading: false
	})
}

export function getUserInfoById(id: string) {
	return api.post<IResponseData<User.IUserInfo>>({
		url: "/users",
		data: {
			id
		}
	})
}

export function getUserMenuByRoleId(id: string) {
	return api.post<IResponseData<Menu.IResMenuList>>({
		url: "/menu",
		data: {
			id
		}
	})
}
