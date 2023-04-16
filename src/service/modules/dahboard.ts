import type { IDashboardList, IResponseData } from "@/types"
import api from "../index"

// 首页顶部列表
export function getDashboardList(data: any) {
	return api.post<IResponseData<IDashboardList>>({
		url: "/count/list",
		data: data
	})
}
