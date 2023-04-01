import type { MockMethod } from "vite-plugin-mock"

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
	// 用户登陆
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
									component: "/system/user/User",
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
									path: "/system/menu",
									name: "menu",
									component: "/system/menu/Menu",
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
