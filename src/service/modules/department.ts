import type { Department, IResponseData } from "@/types"
import api from "../index"

// 部门列表
export function getDepartmentList(data: any) {
	return api.post<IResponseData<Department.IResDepartmentList>>({
		url: "/departmentList",
		data: data
	})
}
