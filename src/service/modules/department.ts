import type { IDepartmentResult, IResponseData } from "@/types"
import api from "../index"

// 部门列表
export function getDepartmentList(data: any) {
	return api.post<IResponseData<IDepartmentResult>>({
		url: "/departmentList",
		data: data
	})
}
