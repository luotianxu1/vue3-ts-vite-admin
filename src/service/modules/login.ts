import api from "../index"
import type { IAccount, IAccountResult, IResponseData, IUserInfo, MenuListResult } from "@/types"

export function accountLoginRequest(account: IAccount) {
	return api.post<IResponseData<IAccountResult>>({
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
	return api.post<IResponseData<IUserInfo>>({
		url: "/users",
		data: {
			id
		}
	})
}

export function getUserMenuByRoleId(id: string) {
	return api.post<IResponseData<MenuListResult>>({
		url: "/menu",
		data: {
			id
		}
	})
}
