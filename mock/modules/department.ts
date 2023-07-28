import type { MockMethod } from "vite-plugin-mock"

export const departmentApiList: MockMethod[] = [
	// 部门列表
	{
		url: "/testApi/departmentList",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询部门列表成功！",
				data: {
					list: [
						{
							id: "@id",
							name: "研发部"
						},
						{
							id: "@id",
							name: "市场部"
						}
					]
				}
			}
		}
	}
]
