import type { ITodaysDataList, IResponseData } from "@/types"
import api from "../index"

// 首页顶部列表
export function getDashboardDataList(data: any) {
	return api.post<IResponseData<ITodaysDataList>>({
		url: "/count/list",
		data: data
	})
}
