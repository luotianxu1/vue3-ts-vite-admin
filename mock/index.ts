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
							path: "/dashborad",
							name: "dashborad",
							component: "/main/dashboard/Dashboard",
							meta: {
								title: "首页",
								icon: "icon-baobiao",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							}
						},
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
									component: "/main/user/User",
									meta: {
										title: "用户管理",
										icon: "icon-yonghu",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									},
									children: [
										{
											title: "新增",
											permission: "system:user:create"
										}
									]
								},
								{
									path: "/main/menu",
									name: "menu",
									component: "/main/menu/Menu",
									meta: {
										title: "菜单管理",
										icon: "icon-caidan",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									},
									children: [
										{
											title: "修改",
											permission: "system:menus:edit"
										}
									]
								}
							]
						},
						{
							path: "/directives",
							name: "directives",
							redirect: "/directives/copyDirect",
							meta: {
								title: "自定义指令",
								icon: "icon-bianji",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/directives/copyDirect",
									name: "copyDirect",
									component: "/directives/copyDirect/CopyDirect",
									meta: {
										title: "复制指令",
										icon: "icon-fuzhi",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/directives/watermarkDirect",
									name: "watermarkDirect",
									component: "/directives/watermarkDirect/WatermarkDirect",
									meta: {
										title: "水印指令",
										icon: "icon-shuiyin",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/directives/dragDirect",
									name: "dragDirect",
									component: "/directives/dragDirect/DragDirect",
									meta: {
										title: "拖拽指令",
										icon: "icon-yidong",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/directives/debounceDirect",
									name: "debounceDirect",
									component: "/directives/debounceDirect/DebounceDirect",
									meta: {
										title: "防抖指令",
										icon: "icon-shaixuan",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/directives/throttleDirect",
									name: "throttleDirect",
									component: "/directives/throttleDirect/ThrottleDirect",
									meta: {
										title: "节流指令",
										icon: "icon-shaixuan",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/directives/longpressDirect",
									name: "longpressDirect",
									component: "/directives/longpressDirect/LongpressDirect",
									meta: {
										title: "长按指令",
										icon: "icon-changan",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								}
							]
						},
						{
							path: "/function",
							name: "function",
							redirect: "/function/bootPage",
							meta: {
								title: "常用功能",
								icon: "icon-gongnengdingyi",
								isFull: false,
								isHide: false,
								isAffix: false,
								isKeepAlive: false
							},
							children: [
								{
									path: "/function/bootPage",
									name: "bootPage",
									component: "/function/guide/Guide",
									meta: {
										title: "引导页",
										icon: "icon-xinshouyindao",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/function/svg",
									name: "svg",
									component: "/function/svg/Svg",
									meta: {
										title: "SVG图标",
										icon: "icon-svg",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/function/wangEditor",
									name: "wangEditor",
									component: "/function/wangEditor/WangEditor",
									meta: {
										title: "富文本编辑器",
										icon: "icon-markdown",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/function/draggable",
									name: "draggable",
									component: "/function/draggable/Draggable",
									meta: {
										title: "拖拽",
										icon: "icon-yidong",
										isFull: false,
										isHide: false,
										isAffix: false,
										isKeepAlive: true
									}
								},
								{
									path: "/function/embedded",
									name: "embedded",
									component: "/function/embedded/Embedded",
									meta: {
										title: "嵌套页面",
										icon: "icon-kaifazhong",
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
	},
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
	},
	// 首页
	{
		url: "/testApi/count/list",
		method: "post",
		response: () => {
			return {
				status: 200,
				message: "查询成功！",
				data: {
					list: [
						{
							title: "今日交易额(元)",
							tips: "stringy",
							number: 714400,
							subTitle: "同比昨日",
							value: 1.6
						},
						{
							title: "今日订单量(元)",
							tips: "stringy",
							number: 5960,
							subTitle: "同比昨日",
							value: -0.5
						},
						{
							title: "今日浏览量",
							tips: "stringy",
							number: 12218,
							subTitle: "同比昨日",
							value: -0.5
						},
						{
							title: "新增会员",
							tips: "stringy",
							number: 2452,
							subTitle: "同比昨日",
							value: 4.0
						}
					]
				}
			}
		}
	}
] as MockMethod[]
