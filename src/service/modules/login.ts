import api from "../index"
import type { IAccountReq, IAccountResult, IResponseData, IUserInfo, IMenuListResult } from "@/types"

export function accountLoginRequest(account: IAccountReq) {
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
	return api.post<IResponseData<IMenuListResult>>({
		url: "/menu",
		data: {
			id
		}
	})
}
