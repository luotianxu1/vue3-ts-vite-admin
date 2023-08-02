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
			gender: "@integer( 0, 1)",
			phone: "@phone",
			email: "@email",
			city: "@county(true)",
			status: "@integer( 0, 1)",
			type: "@integer( 0, 2)",
			img: Random.image("200x100"),
			createTime: "@datetime",
			editTime: "@datetime"
		}
	]
})

export const userApiList: MockMethod[] = [
	// 查询用户列表
	{
		url: "/testApi/user/list",
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
	},
	// 查询用户性别字典
	{
		url: "/testApi/user/gender",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询用户性别字典成功",
				data: [
					{ genderLabel: "男", genderValue: 1 },
					{ genderLabel: "女", genderValue: 0 }
				]
			}
		}
	},
	{
		url: "/testApi/user/status",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询用户性别字典成功",
				data: [
					{ genderLabel: "男", genderValue: 1 },
					{ genderLabel: "女", genderValue: 0 }
				]
			}
		}
	}
]
