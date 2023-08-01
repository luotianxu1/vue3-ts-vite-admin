import type { IResponseData, Dashboard } from "@/types"
import api from "../index"

// 首页顶部列表
export function getDashboardDataList(data: any) {
	return api.post<IResponseData<Dashboard.IResDashBoardDataList>>({
		url: "/count/list",
		data: data
	})
}
