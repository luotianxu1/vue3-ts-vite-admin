import mockjs, { Random } from "mockjs"
import type { MockMethod } from "vite-plugin-mock"

mockjs.Random.extend({
	phone: function () {
		const phonePrefixs = ["132", "135", "189"]
		return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/)
	}
})

const userList = mockjs.mock({
	"list|95": [
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

export const userApiList: MockMethod[] = [
	// 用户列表
	{
		url: "/testApi/userList",
		method: "post",
		response: (data: any) => {
			const req = data.body
			const pageNum = req.pageNum
			const pageSize = req.pageSize
			const list = userList.list.slice((pageNum - 1) * pageSize, pageNum * pageSize)
			return {
				status: 200,
				message: "查询用户列表成功！",
				data: {
					list: list,
					pageNum: pageNum,
					pageSize: pageSize,
					total: userList.list.length
				}
			}
		}
	}
]
