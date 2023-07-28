import mockjs, { Random } from "mockjs"
import type { MockMethod } from "vite-plugin-mock"

export const userApiList: MockMethod[] = [
	// 用户列表
	{
		url: "/testApi/userList",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询用户列表成功！",
				data: mockjs.mock({
					"list|100": [
						{
							id: "@id",
							name: "@cname",
							age: "@integer( 18, 60)",
							sex: "@integer( 0, 1)",
							phone: "@phone",
							email: "@email",
							city: "@county(true)",
							status: "@integer( 0, 1)",
							type: "@integer( 0, 2)",
							img: Random.image("200x100"),
							addTime: "@datetime",
							editTime: "@datetime"
						}
					]
				})
			}
		}
	}
]
