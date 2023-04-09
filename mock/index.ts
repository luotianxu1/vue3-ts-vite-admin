import mockjs, { Random } from "mockjs"
import type { MockMethod } from "vite-plugin-mock"

mockjs.Random.extend({
	phone: function () {
		const phonePrefixs = ["132", "135", "189"] // 自己写前缀哈
		return this.pick(phonePrefixs) + mockjs.mock(/\d{8}/) //Number()
	}
})

export default [
	// 用户登陆
	{
		url: "/testApi/login",
		method: "post",
		response: (data: any) => {
			const res = data.body
			if (res.name === "admin") {
				return {
					status: 200,
					message: "登陆成功！",
					data: {
						id: "@guid",
						name: "admin",
						token: "@guid"
					}
				}
			} else {
				return {
					status: 500,
					message: "登陆失败！",
					data: {}
				}
			}
		}
	},
	// 用户信息
	{
		url: "/testApi/users",
		method: "post",
		response: (data: any) => {
			const res = data.body
			return {
				status: 200,
				message: "查询成功！",
				data: {
					id: "1",
					name: "admin",
					cellphone: 15122061897,
					enable: 1,
					img: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
					createTime: "2023-04-01 14:30:20",
					updateTime: "2023-04-01 14:30:20",
					role: {
						id: 1,
						name: "超级管理员",
						intro: "所有权限"
					},
					department: {
						id: 1,
						name: "总裁办",
						parentId: null,
						leader: null
					}
				}
			}
		}
	},
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
	},
	// 用户菜单
	{
		url: "/testApi/menu",
		method: "post",
		response: (data: any) => {
			const res = data.body
			return {
				status: 200,
				message: "查询成功！",
				data: {
					menu: [
						{
							path: "/main",
							name: "main",
							redirect: "/main/user",
							meta: {
								title: "系统管理",
								icon: "icon-setting",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/main/user",
									name: "user",
									component: "/main/dashboard/Dashboard",
									meta: {
										title: "用户管理",
										icon: "icon-yonghu",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/main/menu",
									name: "menu",
									component: "/main/overView/OverView",
									meta: {
										title: "菜单管理",
										icon: "icon-caidan",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								}
							]
						}
					]
				}
			}
		}
	}
] as MockMethod[]
