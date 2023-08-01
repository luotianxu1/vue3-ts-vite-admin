import type { IResponseData, User } from "@/types"
import api from "../index"

// 用户列表
export function getUserList(data: any) {
	return api.post<IResponseData<User.IResUserList>>({
		url: "/user/list",
		data: data
	})
}

// 获取用户性别字典
export function getUserGender() {
	return api.post<IResponseData<User.IResUserList>>({
		url: "/user/gender"
	})
}
