import type { IPageListResult, IResponseData } from "@/types"
import api from "../index"

// 用户列表
export function getuserList(data: any) {
	return api.post<IResponseData<IPageListResult>>({
		url: "/userList",
		data: data
	})
}
